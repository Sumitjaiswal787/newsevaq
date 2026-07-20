import re

file_path = r'c:\Users\sumitjaiswal\Desktop\sevaq_new\SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0\frontend-flutter-house-help-master\lib\screens\booking_confirmation_screen.dart'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = r'// Assigned Professional Card'
end_marker = r'// Service Details'

replacement = '''// Assigned Professional Card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppTheme.stoneGray, width: 1.0),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.015),
                      blurRadius: 8,
                      offset: const Offset(0, 3),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Assigned professional',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: AppTheme.charcoalBlack,
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Professional details
                    Row(
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: AppTheme.softGreen,
                            borderRadius: BorderRadius.circular(24),
                          ),
                          child: Center(
                            child: Text(
                              displayBooking.worker.user.firstName.isNotEmpty
                                  ? displayBooking.worker.user.firstName[0]
                                  : '?',
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: AppTheme.emeraldGreen,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                ' '.trim(),
                                style: theme.textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: AppTheme.charcoalBlack,
                                ),
                              ),
                              Row(
                                children: [
                                  const Icon(Icons.star, color: Colors.amber, size: 16),
                                  const SizedBox(width: 4),
                                  Text(
                                    '4.8 (120+ jobs)',
                                    style: theme.textTheme.bodyMedium?.copyWith(
                                      color: AppTheme.secondaryText,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              '''

new_content = re.sub(start_marker + r'[\s\S]*?' + end_marker, replacement + end_marker, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Fixed!')
