from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3
import datetime

app = Flask(__name__)
app.secret_key = "supersecretkey"

# Connect to SQLite database
def get_db_connection():
    conn = sqlite3.connect('bank.db')
    conn.row_factory = sqlite3.Row
    return conn

# Initialize the database
def init_db():
    with app.app_context():
        db = get_db_connection()
        db.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                debit_card TEXT,
                expiry_date TEXT,
                cvv TEXT,
                balance REAL DEFAULT 0,
                bonus_rate REAL DEFAULT 0,
                current_rate REAL DEFAULT 0,
                hold_balance REAL DEFAULT 0,
                account_name TEXT,
                account_number TEXT
            )''')
        db.execute('''
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                account_name TEXT,
                account_number TEXT,
                transaction_amount REAL,
                transaction_time TEXT,
                bank TEXT,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )''')
        db.execute('''
            CREATE TABLE IF NOT EXISTS complaints (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                complaint TEXT,
                reply TEXT,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )''')
        db.commit()

# List of US banks
banks = [
    "Bank of America", "Chase", "Wells Fargo", "Citibank", "Capital One",
    "PNC Bank", "US Bank", "Morgan Stanley", "U.S. Bancorp", "Truist Financial",
    "First Horizon National Corporation", "Raymond James Financial", "Deutsche Bank",
    "Comerica", "New York Community Bank", "Western Alliance Bancorporation",
    "Webster Bank", "Mizuho Financial Group", "Popular, Inc", "East West Bank",
    "CIBC Bank USA", "BNP Paribas", "John Deere", "Valley Bank", "Synovus",
    "Wintrust Financial", "Columbia Bank", "BOK Financial Corporation",
    "Cullen/Frost Bankers, Inc.", "Old National Bank", "Pinnacle Financial Partners",
    "FNB Corporation", "UMB Financial Corporation", "South State Bank",
    "Associated Banc-Corp", "Prosperity Bancshares", "Stifel", "EverBank",
    "Midland", "Banc of California", "Hancock Whitney", "BankUnited",
    "Sumitomo Mitsui Banking Corporation", "SoFi", "First National of Nebraska",
    "Commerce Bancshares", "First Interstate BancSystem", "WaFd Bank",
    "United Bank (West Virginia)", "Texas Capital Bank", "Glacier Bancorp",
    "FirstBank Holding Co", "Fulton Financial Corporation", "Simmons Bank",
    "United Community Bank", "Arvest Bank", "BCI Financial Group",
    "Ameris Bancorp", "First Hawaiian Bank", "Bank of Hawaii", "Cathay Bank",
    "Credit Suisse", "Home BancShares", "Beal Bank", "Axos Financial",
    "Atlantic Union Bank", "Customers Bancorp", "Eastern Bank", "WSFS Bank",
    "Pinnacle Bank", "Independent Bank", "HTLF Bank / Heartland Financial",
    "Central Bancompany, Inc.", "First BanCorp", "Independent Bank Group", "Inc.",
    "Pacific Premier Bancorp"
]

# Home route
@app.route('/')
def index():
    return render_template('index.html')


# Signup route
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        db = get_db_connection()
        db.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                   (username, email, password))
        db.commit()
        db.close()
        return redirect(url_for('register'))

    return render_template('signup.html')


# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        db = get_db_connection()
        user = db.execute("SELECT * FROM users WHERE username = ? AND password = ?",
                          (username, password)).fetchone()
        db.close()

        if user:
            session['username'] = user['username']
            session['user_id'] = user['id']
            session['is_admin'] = (username == 'Mayor' and password == 'Mayor')
            return redirect(url_for('admin_dashboard' if session['is_admin'] else 'user_dashboard'))
        else:
            return "Login failed. Check your credentials."
    return render_template('login.html')


# Register card route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        debit_card = request.form['debit_card']
        expiry_date = request.form['expiry_date']
        cvv = request.form['cvv']

        db = get_db_connection()
        db.execute("UPDATE users SET debit_card = ?, expiry_date = ?, cvv = ? WHERE id = ?",
                   (debit_card, expiry_date, cvv, session['user_id']))
        db.commit()
        db.close()
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/balance')
def balance():
    db = get_db_connection()
    user = db.execute("SELECT * FROM users WHERE username = ?", (session['username'],)).fetchone()
    return render_template('balance.html', user=user)

@app.route('/profile')
def profile():
    db = get_db_connection()
    user = db.execute("SELECT * FROM users WHERE username = ?", (session['username'],)).fetchone()
    return render_template('balance.html', user=user)



# User dashboard route
@app.route('/user_dashboard', methods=['GET', 'POST'])
def user_dashboard():
    if 'username' not in session or session['is_admin']:
        return redirect(url_for('login'))

    db = get_db_connection()
    user = db.execute("SELECT * FROM users WHERE id = ?", (session['user_id'],)).fetchone()

    # Fetch and order transactions by transaction_time
    transactions = db.execute(
        "SELECT account_name, account_number, transaction_amount, transaction_time, bank FROM transactions WHERE user_id = ? ORDER BY transaction_time DESC",
        (session['user_id'],)).fetchall()

    if request.method == 'POST':
        complaint_text = request.form['complaint']
        if complaint_text:
            db.execute("INSERT INTO complaints (user_id, complaint) VALUES (?, ?)",
                       (session['user_id'], complaint_text))
            db.commit()

    complaints = db.execute("SELECT * FROM complaints WHERE user_id = ?", (session['user_id'],)).fetchall()
    db.close()

    return render_template('user_dashboard.html', user=user, transactions=transactions, complaints=complaints, banks=banks)

@app.route('/admin_dashboard', methods=['GET', 'POST'])
def admin_dashboard():
    if 'username' not in session or not session['is_admin']:
        return redirect(url_for('login'))

    db = get_db_connection()
    users = db.execute("SELECT * FROM users").fetchall()
    complaints = db.execute("SELECT * FROM complaints").fetchall()

    if request.method == 'POST':
        user_id = request.form['user_id']
        balance = request.form['balance']
        bonus_rate = request.form['bonus_rate']
        debit_card = request.form['debit_card']
        expiry_date = request.form['expiry_date']
        cvv = request.form['cvv']
        current_rate = request.form['current_rate']
        hold_balance = request.form['hold_balance']
        reply = request.form.get('reply')
        complaint_id = request.form.get('complaint_id')
        transaction_time = request.form['transaction_time']  # Get edited transaction time

        db.execute('''
            UPDATE users SET balance = ?, bonus_rate = ?, debit_card = ?, expiry_date = ?,
            cvv = ?, current_rate = ?, hold_balance = ?, transaction_time = ?
            WHERE id = ?''', (balance, bonus_rate, debit_card, expiry_date, cvv, current_rate, hold_balance, transaction_time, user_id))

        if reply and complaint_id:
            db.execute("UPDATE complaints SET reply = ? WHERE id = ?", (reply, complaint_id))

        db.commit()
    db.close()
    return render_template('admin_dashboard.html', users=users, complaints=complaints)

# Logout route
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)