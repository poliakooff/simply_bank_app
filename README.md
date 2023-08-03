Simply Bank App

The Simply Bank App is a simple web-based banking application that allows users to manage their accounts and perform basic banking transactions. This README provides an overview of the application's features, architecture, and usage instructions.

Features
Account Management: Users can log in to their accounts using their username and PIN. The app supports multiple accounts, and each account is associated with a user's name, transaction history, interest rate, and currency.

Transaction History: The app displays a transaction history for each account, showing deposits, withdrawals, and their respective dates. Transactions are sorted by date by default, and users can toggle sorting between ascending and descending order.

Balance and Summary: The app calculates and displays the current account balance, total deposits, total withdrawals, and earned interest. The interest is calculated based on the account's interest rate for positive deposits over a certain threshold.

Loan Management: Users can request and receive loans. The app checks if the requested loan amount is within 10% of the user's previous deposits, and if so, the loan is granted.

Automatic Logout: To ensure security, the app automatically logs out users after 60 seconds of inactivity.

Getting Started
Clone the repository or download the source code.
bash
Copy code
git clone https://github.com/your-username/simply-bank-app.git
Open the index.html file in your preferred web browser.

Create an account by using the provided test data or modify the accounts array to add your custom accounts.

Log in with the account's nickname (created from the first letters of the user's name) and the corresponding PIN.

Usage
Login: Enter the account's nickname and PIN to log in.

View Transaction History: Once logged in, the app displays the account's transaction history, sorted by date in ascending order. Click on the "Sort" button to toggle sorting between ascending and descending order.

Transfer Funds: Transfer funds to another account by entering the recipient's nickname and the transfer amount. The recipient account must exist, and the transfer amount should be less than or equal to the sender's balance.

Request Loan: Request a loan by entering the desired loan amount. The loan is granted if the amount is within 10% of the user's previous deposits.

Close Account: To close the account, enter the account's nickname and PIN, and click the "Close Account" button.

Dependencies
The Simply Bank App uses HTML, CSS, and JavaScript for its frontend. No external libraries or frameworks are required.

Support and Contributions
If you encounter any issues or have suggestions for improvement, please submit an issue on the GitHub repository. Contributions via pull requests are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.
