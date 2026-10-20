IT BROTHERS ATTENDANCE & SALARY FEATURE

IMPORTANT VERSION NOTE
This package is integrated into the dashboard snapshot available in the conversation (source archive dated 2026-09-24), with the Apps Script version named IT_Brothers_Apps_Script_phone_status_fix.gs. If your live GitHub project has later edits, merge the attendance UI into that current project rather than blindly replacing it. The Apps Script file included here is the full supplied Apps Script plus attendance actions.

SALARY RULES
Full Day: earned Rs. 400; daily cash Rs. 100; saved Rs. 300.
Half Day: earned Rs. 200; daily cash Rs. 100; saved Rs. 100.
Absent/Leave: Rs. 0.
Attendance is unique per employee per date; saving again edits that date instead of duplicating it.

SETUP
1. In the existing Google Apps Script project, make a backup of current code and replace it with IT_Brothers_Apps_Script_attendance.gs only if this supplied source is still your live backend. Otherwise merge the attendance block/helper functions into your latest code.
2. Apps Script → Project Settings → Script Properties → Add script property: ITB_ATTENDANCE_PIN = your private PIN (choose a new PIN, do not share it in chat). Save.
3. Save and Deploy → Manage deployments → edit the existing web app deployment → deploy a new version. Keep the same deployment URL if possible.
4. Upload the included index.html and logo.png to your current website/repository, preserving the rest of your project files. Do not change the existing Apps Script URL in index.html.
5. Open Attendance & Salary, enter PIN, add your two employee names, then mark attendance.

SECURITY
Attendance actions require the PIN at the Apps Script backend. The ordinary dashboard's existing Work Orders/Sales/Expenses API is unchanged and remains as it was before this feature. Do not treat the PIN as protection for the rest of the dashboard.

MONTH-END PAYMENTS
The module prevents a recorded payment from exceeding that employee's saved balance for the selected month. Payments are stored in Employee Payments and do not automatically add an expense to the existing Expenses sheet, to avoid double-counting without your explicit accounting choice.
