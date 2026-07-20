import re

file_path = r'c:\Users\sumitjaiswal\Desktop\sevaq_new\SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0\frontend-flutter-house-help-master\lib\screens\booking_confirmation_screen.dart'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix import
content = content.replace("import '../theme/theme.dart';", "import '../theme.dart';")

# Find the messed up Row block inside Assigned professional Card.
# It currently has:
#                     Row(
#                       children: [
#                         Container(
#                           width: 48,
#                           height: 48,
#                           decoration: BoxDecoration(
#                             color: AppTheme.softGreen,
#                             borderRadius: BorderRadius.circular(24),
#                           ),
#                           child: Center(
#                             child: Text(
#                               displayBooking.worker.user.firstName.isNotEmpty
#                                   ? displayBooking.worker.user.firstName[0]
#                                   : '?',
#                               style: const TextStyle(
#                                 fontSize: 20,
#                                 fontWeight: FontWeight.bold,
#                                 color: AppTheme.emeraldGreen,
#                               ),
#                             ),
#                           ),
#
#                     const SizedBox(height: 12),

malformed_pattern = re.compile(
    r"(displayBooking\.worker\.user\.firstName\[0\]\s*:\s*'\?',\s*style:\s*const TextStyle\([\s\S]*?color:\s*AppTheme\.emeraldGreen,\s*\),\s*\),\s*\),)([\s\S]*?const SizedBox\(height:\s*12\),)",
    re.MULTILINE
)

def replacer(match):
    # we need to close the center, container, and row, and add the text block for name
    replacement = r"""\1
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
                    ),\2"""
    return replacement

new_content = malformed_pattern.sub(replacer, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Fixed!')
