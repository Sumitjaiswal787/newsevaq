
import re

with open(r"C:\Users\sumitjaiswal\Desktop\sevaq_new\SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0\worker_app_flutter\lib\screens\booking_detail_screen.dart", "r", encoding="utf-8") as f:
    content = f.read()

old_build = """class WorkerBookingDetailScreen extends StatelessWidget {
  final Booking booking;

  const WorkerBookingDetailScreen({super.key, required this.booking});

  @override
  Widget build(BuildContext context) {"""

new_build = """class WorkerBookingDetailScreen extends StatelessWidget {
  final Booking booking;

  const WorkerBookingDetailScreen({super.key, required this.booking});

  Booking _getLatestBooking(BuildContext context) {
    try {
      final provider = context.watch<BookingProvider>();
      final allBookings = [
        ...provider.pendingBookings,
        ...provider.inProgressBookings,
        ...provider.completedBookings
      ];
      return allBookings.firstWhere((b) => b.id == booking.id);
    } catch (_) {
      return booking;
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentBooking = _getLatestBooking(context);"""

content = content.replace(old_build, new_build)

content = content.replace("booking.status", "currentBooking.status")
content = content.replace("booking.startedAt", "currentBooking.startedAt")
content = content.replace("booking.customerAddress", "currentBooking.customerAddress")
content = content.replace("booking.isPending", "currentBooking.isPending")
content = content.replace("booking.isConfirmed", "currentBooking.isConfirmed")
content = content.replace("booking.isInProgress", "currentBooking.isInProgress")
content = content.replace("booking.isCompleted", "currentBooking.isCompleted")
content = content.replace("booking.isOtpRequired", "currentBooking.isOtpRequired")
content = content.replace("booking.isCompletionOtpRequired", "currentBooking.isCompletionOtpRequired")
content = content.replace("booking.price", "currentBooking.price")
content = content.replace("booking.paymentStatus", "currentBooking.paymentStatus")
content = content.replace("booking.notes", "currentBooking.notes")
content = content.replace("booking.id", "currentBooking.id")
content = content.replace("booking.customerName", "currentBooking.customerName")
content = content.replace("booking.customerPhone", "currentBooking.customerPhone")

content = content.replace("_buildStatusCard(context)", "_buildStatusCard(context, currentBooking)")
content = content.replace("_buildInfoCard(context)", "_buildInfoCard(context, currentBooking)")
content = content.replace("_buildCustomerCard(context)", "_buildCustomerCard(context, currentBooking)")
content = content.replace("_buildAddressCard(context)", "_buildAddressCard(context, currentBooking)")
content = content.replace("_buildActionButtons(context)", "_buildActionButtons(context, currentBooking)")
content = content.replace("_handleAccept(context, bookingProvider)", "_handleAccept(context, bookingProvider, currentBooking)")
content = content.replace("_handleReject(context, bookingProvider)", "_handleReject(context, bookingProvider, currentBooking)")
content = content.replace("_handleStart(context, bookingProvider)", "_handleStart(context, bookingProvider, currentBooking)")
content = content.replace("_handleComplete(context, bookingProvider)", "_handleComplete(context, bookingProvider, currentBooking)")

content = content.replace("Widget _buildStatusCard(BuildContext context) {", "Widget _buildStatusCard(BuildContext context, Booking currentBooking) {")
content = content.replace("Widget _buildInfoCard(BuildContext context) {", "Widget _buildInfoCard(BuildContext context, Booking currentBooking) {")
content = content.replace("Widget _buildCustomerCard(BuildContext context) {", "Widget _buildCustomerCard(BuildContext context, Booking currentBooking) {")
content = content.replace("Widget _buildAddressCard(BuildContext context) {", "Widget _buildAddressCard(BuildContext context, Booking currentBooking) {")
content = content.replace("Widget _buildActionButtons(BuildContext context) {", "Widget _buildActionButtons(BuildContext context, Booking currentBooking) {")

content = content.replace("Future<void> _handleAccept(\n    BuildContext context,\n    BookingProvider provider,\n  ) async {", "Future<void> _handleAccept(\n    BuildContext context,\n    BookingProvider provider,\n    Booking currentBooking,\n  ) async {")
content = content.replace("Future<void> _handleReject(\n    BuildContext context,\n    BookingProvider provider,\n  ) async {", "Future<void> _handleReject(\n    BuildContext context,\n    BookingProvider provider,\n    Booking currentBooking,\n  ) async {")
content = content.replace("Future<void> _handleStart(\n    BuildContext context,\n    BookingProvider provider,\n  ) async {", "Future<void> _handleStart(\n    BuildContext context,\n    BookingProvider provider,\n    Booking currentBooking,\n  ) async {")
content = content.replace("Future<void> _handleComplete(\n    BuildContext context,\n    BookingProvider provider,\n  ) async {", "Future<void> _handleComplete(\n    BuildContext context,\n    BookingProvider provider,\n    Booking currentBooking,\n  ) async {")


with open(r"C:\Users\sumitjaiswal\Desktop\sevaq_new\SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0\worker_app_flutter\lib\screens\booking_detail_screen.dart", "w", encoding="utf-8") as f:
    f.write(content)

