import re

with open(r'c:\Users\sumitjaiswal\Desktop\sevaq_new\SEVAQ-16580cb5e3e78e0c1b06bc21433871a6cc4e3cb0\frontend-flutter-house-help-master\lib\screens\booking_confirmation_screen.dart', 'r', encoding='utf-8') as f:
    content = f.read()

if 'import \'package:flutter_house_help/theme/theme.dart\';' not in content:
    content = content.replace('import \'package:intl/intl.dart\';', 'import \'package:intl/intl.dart\';\nimport \'package:flutter_house_help/theme/theme.dart\';')

# The code seems to be malformed around line 167: 'Container('
# Let's fix the missing closing tags by regex or manual fix.
# Wait, I don't know the exact file contents perfectly. Let's just use git checkout to revert the file to the last commit, since I didn't actually want to modify it just now. The syntax errors were from an earlier incomplete change.

