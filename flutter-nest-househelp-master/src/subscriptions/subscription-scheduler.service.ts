import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SubscriptionsService } from './subscriptions.service';
import { ServiceRequestsService } from '../service-requests/service-requests.service';
import { ServiceRequestSource } from '../service-requests/entities/service-request.entity';

@Injectable()
export class SubscriptionSchedulerService {
  private readonly logger = new Logger(SubscriptionSchedulerService.name);

  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly serviceRequestsService: ServiceRequestsService,
  ) {}

  @Cron('0 0 * * *') // Runs daily at midnight
  async handleDailySubscriptionProcessing() {
    this.logger.log('Starting daily subscription processing');

    try {
      const activeSubscriptions =
        await this.subscriptionsService.getActiveSubscriptions();
      this.logger.log(
        `Found ${activeSubscriptions.length} active subscriptions`,
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const subscription of activeSubscriptions) {
        // Check if subscription is still active and not ended
        if (
          subscription.status === 'ACTIVE' &&
          (!subscription.endDate || subscription.endDate > today) &&
          subscription.startDate <= today
        ) {
          // Check if today matches the subscription frequency
          if (this.isTodayMatchingFrequency(subscription, today)) {
            // Create service request for today
            await this.createServiceRequest(subscription, today);
          }
        }
      }

      this.logger.log('Daily subscription processing completed');
    } catch (error) {
      this.logger.error('Error processing subscriptions', error);
    }
  }

  private isTodayMatchingFrequency(subscription: any, today: Date): boolean {
    const todayDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    switch (subscription.frequency) {
      case 'DAILY':
        return true;

      case 'WEEKDAYS':
        return todayDayOfWeek >= 1 && todayDayOfWeek <= 5; // Monday to Friday

      case 'CUSTOM_DAYS':
        if (subscription.customDays && Array.isArray(subscription.customDays)) {
          return subscription.customDays.includes(todayDayOfWeek);
        }
        return false;

      default:
        return false;
    }
  }

  private async createServiceRequest(subscription: any, date: Date) {
    try {
      const customData = typeof subscription.customPlanData === 'string'
        ? JSON.parse(subscription.customPlanData)
        : subscription.customPlanData;

      const isCooking =
        customData?.serviceType?.toLowerCase() === 'cooking' ||
        customData?.category?.toLowerCase() === 'cooking' ||
        subscription.serviceProfile?.serviceType?.toLowerCase() === 'cook';

      const mealPlan = customData?.mealPlan || null;

      if (isCooking && mealPlan) {
        const mealPlanStr = String(mealPlan).toUpperCase();
        
        if (mealPlanStr === 'BF' || mealPlanStr === 'BF_LUNCH') {
          await this.serviceRequestsService.create(subscription.userId, {
            serviceProfileId: subscription.serviceProfileId,
            source: ServiceRequestSource.SUBSCRIPTION,
            date: date.toISOString().split('T')[0],
            timeWindow: '05:30 AM - 06:30 AM',
            priceSnapshot: subscription.monthlyPriceSnapshot / 30,
            location: subscription.location,
          });
          this.logger.log(`Created Morning Cooking request (5:30 AM - 6:30 AM) for subscription ${subscription.id}`);
          return;
        }

        if (mealPlanStr === 'LUNCH') {
          await this.serviceRequestsService.create(subscription.userId, {
            serviceProfileId: subscription.serviceProfileId,
            source: ServiceRequestSource.SUBSCRIPTION,
            date: date.toISOString().split('T')[0],
            timeWindow: '11:00 AM - 12:00 PM',
            priceSnapshot: subscription.monthlyPriceSnapshot / 30,
            location: subscription.location,
          });
          this.logger.log(`Created Lunch Cooking request (11:00 AM - 12:00 PM) for subscription ${subscription.id}`);
          return;
        }

        if (mealPlanStr === 'DINNER') {
          await this.serviceRequestsService.create(subscription.userId, {
            serviceProfileId: subscription.serviceProfileId,
            source: ServiceRequestSource.SUBSCRIPTION,
            date: date.toISOString().split('T')[0],
            timeWindow: '05:00 PM - 06:00 PM',
            priceSnapshot: subscription.monthlyPriceSnapshot / 30,
            location: subscription.location,
          });
          this.logger.log(`Created Dinner Cooking request (5:00 PM - 6:00 PM) for subscription ${subscription.id}`);
          return;
        }

        if (mealPlanStr === 'LUNCH_DINNER') {
          await this.serviceRequestsService.create(subscription.userId, {
            serviceProfileId: subscription.serviceProfileId,
            source: ServiceRequestSource.SUBSCRIPTION,
            date: date.toISOString().split('T')[0],
            timeWindow: '11:00 AM - 12:00 PM',
            priceSnapshot: (subscription.monthlyPriceSnapshot / 30) / 2,
            location: subscription.location,
          });

          await this.serviceRequestsService.create(subscription.userId, {
            serviceProfileId: subscription.serviceProfileId,
            source: ServiceRequestSource.SUBSCRIPTION,
            date: date.toISOString().split('T')[0],
            timeWindow: '05:00 PM - 06:00 PM',
            priceSnapshot: (subscription.monthlyPriceSnapshot / 30) / 2,
            location: subscription.location,
          });
          this.logger.log(`Created 2 Cooking requests (11 AM - 12 PM & 5 PM - 6 PM) for subscription ${subscription.id}`);
          return;
        }

        if (mealPlanStr === 'FULL_DAY') {
          await this.serviceRequestsService.create(subscription.userId, {
            serviceProfileId: subscription.serviceProfileId,
            source: ServiceRequestSource.SUBSCRIPTION,
            date: date.toISOString().split('T')[0],
            timeWindow: '05:30 AM - 06:30 AM',
            priceSnapshot: (subscription.monthlyPriceSnapshot / 30) / 2,
            location: subscription.location,
          });

          await this.serviceRequestsService.create(subscription.userId, {
            serviceProfileId: subscription.serviceProfileId,
            source: ServiceRequestSource.SUBSCRIPTION,
            date: date.toISOString().split('T')[0],
            timeWindow: '05:00 PM - 06:00 PM',
            priceSnapshot: (subscription.monthlyPriceSnapshot / 30) / 2,
            location: subscription.location,
          });
          this.logger.log(`Created 2 Cooking requests (5:30 AM - 6:30 AM & 5 PM - 6 PM) for subscription ${subscription.id}`);
          return;
        }
      }

      // Default/Legacy behavior fallback
      let timeWindow = 'morning';
      if (subscription.preferredTimeWindow) {
        timeWindow = subscription.preferredTimeWindow.toLowerCase();
      }

      await this.serviceRequestsService.create(subscription.userId, {
        serviceProfileId: subscription.serviceProfileId,
        source: ServiceRequestSource.SUBSCRIPTION,
        date: date.toISOString().split('T')[0],
        timeWindow: timeWindow,
        priceSnapshot: subscription.monthlyPriceSnapshot / 30,
        location: subscription.location,
      });

      this.logger.log(
        `Created service request for subscription ${subscription.id} on ${date.toISOString().split('T')[0]}`,
      );
    } catch (error) {
      this.logger.error(
        `Error creating service request for subscription ${subscription.id}:`,
        error,
      );
    }
  }
}
