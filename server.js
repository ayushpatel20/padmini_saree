const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = "padmini_secret_key_123";

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database file path
const dbPath = path.join(__dirname, 'api', 'db.json');

// Helper to parse cookies from headers without cookie-parser dependency
function getCookie(req, name) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return undefined;
  const matches = cookieHeader.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Read JSON database
function readDb() {
  if (!fs.existsSync(dbPath)) {
    return {
      users: [],
      products: [],
      cart: [],
      wishlist: [],
      addresses: [],
      orders: [],
      reviews: []
    };
  }
  try {
    const raw = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading db.json:", err);
    return {
      users: [],
      products: [],
      cart: [],
      wishlist: [],
      addresses: [],
      orders: [],
      reviews: []
    };
  }
}

// Write JSON database
function writeDb(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing db.json:", err);
  }
}

// Unique ID Generator
function generateId() {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

// Date string generator
function getISODate() {
  return new Date().toISOString();
}

// Database query helpers mimicking PHP's db functions
function db_getCollection(collection) {
  const db = readDb();
  return db[collection] || [];
}

function db_find(collection, query = {}) {
  const items = db_getCollection(collection);
  return items.filter(item => {
    for (const key in query) {
      if (item[key] !== query[key]) return false;
    }
    return true;
  });
}

function db_findOne(collection, query = {}) {
  const res = db_find(collection, query);
  return res.length > 0 ? res[0] : null;
}

function db_insert(collection, item) {
  const db = readDb();
  if (!db[collection]) db[collection] = [];
  
  const newItem = {
    _id: item._id || generateId(),
    ...item,
    createdAt: item.createdAt || getISODate(),
    updatedAt: item.updatedAt || getISODate()
  };
  
  db[collection].push(newItem);
  writeDb(db);
  return newItem;
}

function db_update(collection, query, updates) {
  const db = readDb();
  if (!db[collection]) return null;
  
  let updatedItem = null;
  for (let i = 0; i < db[collection].length; i++) {
    const item = db[collection][i];
    let match = true;
    for (const key in query) {
      if (item[key] !== query[key]) {
        match = false;
        break;
      }
    }
    if (match) {
      db[collection][i] = {
        ...item,
        ...updates,
        updatedAt: getISODate()
      };
      updatedItem = db[collection][i];
      break;
    }
  }
  
  if (updatedItem) {
    writeDb(db);
  }
  return updatedItem;
}

function db_delete(collection, query) {
  const db = readDb();
  if (!db[collection]) return true;
  
  const initialLen = db[collection].length;
  db[collection] = db[collection].filter(item => {
    for (const key in query) {
      if (item[key] !== query[key]) return true; // Keep
    }
    return false; // Remove
  });
  
  if (db[collection].length !== initialLen) {
    writeDb(db);
  }
  return true;
}

// Authentication Middlewares
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET, (err, payload) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = payload;
    next();
  });
}

function requireAdmin(req, res, next) {
  authenticateToken(req, res, () => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  });
}

// Create Router for API endpoints
const apiRouter = express.Router();

// Register user
apiRouter.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide name, email, and password" });
  }
  const cleanEmail = email.toLowerCase().trim();
  if (db_findOne('users', { email: cleanEmail })) {
    return res.status(400).json({ message: "User already exists with this email" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = db_insert('users', {
    name: name.trim(),
    email: cleanEmail,
    password: hashedPassword,
    role: 'user'
  });

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET);
  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

// Login user
apiRouter.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }
  const cleanEmail = email.toLowerCase().trim();
  const user = db_findOne('users', { email: cleanEmail });
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET);
  res.status(200).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

// Guest OTP Send
apiRouter.post('/guest/send-otp', (req, res) => {
  res.status(200).json({ success: true, message: "OTP sent successfully (Use code: 123456)" });
});

// Guest OTP Verify
apiRouter.post('/guest/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ message: "Phone and OTP are required" });
  }
  if (otp !== "123456" && otp !== "1234") {
    return res.status(400).json({ message: "Invalid OTP code. Use 123456" });
  }

  const email = `guest_${phone}@padminivasthra.com`;
  let user = db_findOne('users', { email });
  if (!user) {
    user = db_insert('users', {
      name: `Guest (${phone})`,
      email,
      phone,
      role: 'guest'
    });
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET);
  res.status(200).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

// Get products list
apiRouter.get('/products', (req, res) => {
  res.status(200).json(db_getCollection('products'));
});

// Reviews GET
apiRouter.get('/reviews/:productId', (req, res) => {
  const productId = req.params.productId;
  const reviews = db_find('reviews', { productId }) || [];
  const count = reviews.length;
  let avg = 0;
  const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  if (count > 0) {
    let sum = 0;
    reviews.forEach(r => {
      const rating = Math.round(parseFloat(r.rating || 5));
      if (breakdown[rating] !== undefined) breakdown[rating]++;
      sum += parseFloat(r.rating || 5);
    });
    avg = Math.round((sum / count) * 10) / 10;
  }
  res.status(200).json({ reviews, count, avg, breakdown });
});

// Reviews POST
apiRouter.post('/reviews/:productId', authenticateToken, (req, res) => {
  const productId = req.params.productId;
  const { rating, title, body } = req.body;
  if (!rating) {
    return res.status(400).json({ message: "Rating is required" });
  }
  const user = db_findOne('users', { _id: req.user.id });
  const rev = db_insert('reviews', {
    productId,
    userId: req.user.id,
    userName: user ? user.name : "Anonymous",
    rating: parseInt(rating),
    title: title || "",
    body: body || ""
  });
  res.status(201).json(rev);
});

// Cart GET
apiRouter.get('/cart', authenticateToken, (req, res) => {
  const items = db_find('cart', { userId: req.user.id });
  const products = db_getCollection('products');
  const populated = items.map(item => {
    const prod = products.find(p => p._id === item.productId);
    let itemImage = "";
    if (prod) {
      if (item.variant && prod.variants && Array.isArray(prod.variants)) {
        const idx = prod.variants.findIndex(v => v && v.toLowerCase().trim() === item.variant.toLowerCase().trim());
        if (idx !== -1 && prod.images && prod.images[idx]) {
          itemImage = prod.images[idx];
        }
      }
      if (!itemImage) {
        itemImage = Array.isArray(prod.images) && prod.images.length > 0 ? prod.images[0] : (prod.image || "");
      }
    }
    return {
      _id: item._id,
      productId: item.productId,
      quantity: item.quantity,
      variant: item.variant || "",
      name: prod ? prod.name : "Unknown Product",
      price: prod ? (prod.discountPrice ?? prod.price) : 0,
      image: itemImage,
      stock: prod ? prod.stock : 0,
      discountPercent: prod ? (prod.discountPercent || 0) : 0
    };
  });
  // Return wrapped object for compatibility with frontend `t.ok && n.cart && M(n.cart.items || [])`
  res.status(200).json({ cart: { items: populated } });
});

// Cart Add POST
apiRouter.post('/cart/add', authenticateToken, (req, res) => {
  const { productId, quantity, variant } = req.body;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  const qty = parseInt(quantity || 1);
  const v = variant || "";
  const existing = db_findOne('cart', { userId: req.user.id, productId, variant: v });
  
  if (existing) {
    const updated = db_update('cart', { _id: existing._id }, { quantity: existing.quantity + qty });
    res.status(200).json(updated);
  } else {
    const inserted = db_insert('cart', {
      userId: req.user.id,
      productId,
      quantity: qty,
      variant: v
    });
    res.status(200).json(inserted);
  }
});

// Cart Remove POST
apiRouter.post('/cart/remove', authenticateToken, (req, res) => {
  const { productId, variant } = req.body;
  db_delete('cart', { userId: req.user.id, productId, variant: variant || "" });
  res.status(200).json({ success: true });
});

// Cart Update PUT
apiRouter.put('/cart/update', authenticateToken, (req, res) => {
  const { productId, cartItemId, quantity } = req.body;
  const qty = parseInt(quantity);
  const id = cartItemId || req.body._id;
  
  if (qty < 1) {
    if (id) {
      db_delete('cart', { _id: id, userId: req.user.id });
    } else {
      db_delete('cart', { productId, userId: req.user.id });
    }
    return res.status(200).json({ success: true });
  }

  let updated = null;
  if (id) {
    updated = db_update('cart', { _id: id, userId: req.user.id }, { quantity: qty });
  } else {
    updated = db_update('cart', { productId, userId: req.user.id }, { quantity: qty });
  }
  
  res.status(200).json({ success: true, cartItem: updated });
});

// Cart Remove DELETE
apiRouter.delete('/cart/remove/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  db_delete('cart', { _id: id, userId: req.user.id });
  res.status(200).json({ success: true });
});

// Cart Merge POST
apiRouter.post('/cart/merge', authenticateToken, (req, res) => {
  const items = req.body.items || [];
  items.forEach(it => {
    const pid = it.productId;
    if (!pid) return;
    const qty = parseInt(it.quantity || 1);
    const v = it.variant || "";
    const ex = db_findOne('cart', { userId: req.user.id, productId: pid, variant: v });
    if (ex) {
      db_update('cart', { _id: ex._id }, { quantity: ex.quantity + qty });
    } else {
      db_insert('cart', {
        userId: req.user.id,
        productId: pid,
        quantity: qty,
        variant: v
      });
    }
  });
  res.status(200).json({ success: true });
});

// Wishlist GET
apiRouter.get('/wishlist', authenticateToken, (req, res) => {
  const items = db_find('wishlist', { userId: req.user.id });
  res.status(200).json(items);
});

// Wishlist Toggle POST
apiRouter.post('/wishlist/toggle', authenticateToken, (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  const ex = db_findOne('wishlist', { userId: req.user.id, productId });
  if (ex) {
    db_delete('wishlist', { _id: ex._id });
    res.status(200).json({ status: "removed" });
  } else {
    const inserted = db_insert('wishlist', { userId: req.user.id, productId });
    res.status(200).json(inserted);
  }
});

// Addresses GET
apiRouter.get('/addresses', authenticateToken, (req, res) => {
  res.status(200).json({ success: true, addresses: db_find('addresses', { userId: req.user.id }) });
});

// Address POST (create)
apiRouter.post('/addresses', authenticateToken, (req, res) => {
  const addr = {
    userId: req.user.id,
    ...req.body
  };
  const inserted = db_insert('addresses', addr);
  res.status(201).json({ success: true, address: inserted });
});

// Address PUT (update)
apiRouter.put('/addresses/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const updated = db_update('addresses', { _id: id, userId: req.user.id }, req.body);
  res.status(200).json({ success: true, address: updated });
});

// Address DELETE
apiRouter.delete('/addresses/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  db_delete('addresses', { _id: id, userId: req.user.id });
  res.status(200).json({ success: true });
});

// Create Order POST
apiRouter.post('/checkout/create-order', authenticateToken, (req, res) => {
  const orderData = {
    userId: req.user.id,
    status: 'Processing',
    ...req.body
  };
  const order = db_insert('orders', orderData);
  db_delete('cart', { userId: req.user.id });
  res.status(200).json({ success: true, order, orderId: order._id });
});

// COD Order POST
apiRouter.post('/checkout/cod', authenticateToken, (req, res) => {
  const orderData = {
    userId: req.user.id,
    status: 'Processing',
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    ...req.body
  };
  const order = db_insert('orders', orderData);
  db_delete('cart', { userId: req.user.id });
  res.status(200).json({ success: true, order, orderId: order._id });
});

// Orders GET
apiRouter.get('/orders', authenticateToken, (req, res) => {
  res.status(200).json(db_find('orders', { userId: req.user.id }));
});

function normalizeProductData(body) {
  let images = [];
  if (Array.isArray(body.images)) {
    images = body.images.map(img => img ? img.split('?')[0] : '').filter(Boolean);
  } else if (body.image) {
    images = [body.image.split('?')[0]];
  }
  
  const price = Number(body.price || 0);
  const discountPrice = Number(body.discountPrice || 0);
  let discountPercent = 0;
  if (price > 0 && discountPrice > 0 && price > discountPrice) {
    discountPercent = Math.round(((price - discountPrice) / price) * 100);
  }

  let variants = [];
  if (Array.isArray(body.variants)) {
    variants = body.variants.map(v => v ? v.trim() : "").filter((_, idx) => body.images[idx] && body.images[idx].trim() !== "");
  }

  return {
    ...body,
    price,
    discountPrice,
    discountPercent,
    images,
    image: images[0] || "",
    variants
  };
}

// Admin products GET
apiRouter.get('/admin/products', requireAdmin, (req, res) => {
  res.status(200).json({ success: true, products: db_getCollection('products') });
});

// Admin product PUT (update)
apiRouter.put('/admin/products/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const normalized = normalizeProductData(req.body);
  const updated = db_update('products', { _id: id }, normalized);
  res.status(200).json({ success: true, product: updated });
});

// Admin product POST (create)
apiRouter.post('/admin/products', requireAdmin, (req, res) => {
  const normalized = normalizeProductData(req.body);
  const product = db_insert('products', normalized);
  res.status(200).json({ success: true, product });
});

// Admin product DELETE
apiRouter.delete('/admin/products/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  db_delete('products', { _id: id });
  res.status(200).json({ success: true });
});

// Admin stats GET
apiRouter.get('/admin/stats', requireAdmin, (req, res) => {
  const orders = db_getCollection('orders');
  let totalRev = 0;
  const totalSales = orders.length;
  orders.forEach(o => {
    totalRev += parseFloat(o.totalAmount || 0);
  });
  res.status(200).json({
    success: true,
    stats: {
      totalSales,
      totalRevenue: totalRev,
      totalProducts: db_getCollection('products').length,
      totalUsers: db_getCollection('users').length
    }
  });
});

// Multer Upload configuration for product images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB max
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP).'));
    }
  }
});

// Upload POST — with multer error handling
apiRouter.post('/upload', requireAdmin, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File is too large. Maximum allowed size is 8 MB.' });
      }
      return res.status(400).json({ error: err.message || 'Upload failed.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Please select an image file to upload.' });
    }
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

// Mount the API Router for both /api and /api/index.php paths to support built routing
app.use('/api', apiRouter);
app.use('/api/index.php', apiRouter);

// Static File Hosting
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve manage-bestsellers.html at its expected path
app.get('/manage-bestsellers.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'manage-bestsellers.html'));
});

// Replicate manage_homepage.php functionality in Javascript
app.get('/manage_homepage.php', (req, res) => {
  const loggedIn = getCookie(req, 'homepage_manager_logged_in') === 'true';
  
  if (!loggedIn) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Login - Homepage Manager</title>
          <style>
              body { font-family: Arial, sans-serif; background: #fafaf7; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
              .login-box { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center; }
              input[type="password"] { padding: 10px; width: 80%; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 5px; }
              button { padding: 10px 20px; background: #2c3e50; color: white; border: none; border-radius: 5px; cursor: pointer; }
          </style>
      </head>
      <body>
          <div class="login-box">
              <h2>Homepage Manager Login</h2>
              <form method="POST" action="/manage_homepage.php/login">
                  <input type="password" name="password" placeholder="Enter Password" required autofocus>
                  <br>
                  <button type="submit">Login</button>
              </form>
          </div>
      </body>
      </html>
    `);
  }

  // Categories list HTML
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Homepage Image Manager</title>
        <style>
            body { font-family: Arial, sans-serif; background: #fafaf7; padding: 40px; color: #333; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
            h1 { margin-top: 0; color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 15px; }
            .logout-btn { float: right; background: #c0392b; color: white; text-decoration: none; padding: 8px 15px; border-radius: 5px; font-size: 14px; }
            .category-list { margin-top: 20px; }
            .category-item { display: flex; align-items: center; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #eee; }
            .category-info { display: flex; align-items: center; gap: 15px; }
            .category-img { width: 60px; height: 60px; object-fit: cover; border-radius: 5px; border: 1px solid #ddd; }
            .category-name { font-weight: bold; }
            form { display: flex; gap: 10px; align-items: center; }
            input[type="file"] { font-size: 13px; }
            button { padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; }
            .success { background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <a href="/manage_homepage.php/logout" class="logout-btn">Logout</a>
            <h1>Homepage Image Manager</h1>
            <div id="message"></div>
            
            <div class="category-list">
                ${[
                  { id: 1, name: "Kalyani Cotton" },
                  { id: 2, name: "Khadi Embroidery" },
                  { id: 3, name: "Mul Cotton" },
                  { id: 4, name: "Gini Tissue" },
                  { id: 5, name: "Soft Silk" },
                  { id: 6, name: "Borderless Silk" },
                  { id: 7, name: "Plain Silk" },
                  { id: 8, name: "Champion Silk" },
                  { id: 9, name: "Ds Kottanchi" }
                ].map(cat => `
                  <div class="category-item">
                      <div class="category-info">
                          <img class="category-img" src="/uploads/categories/${cat.id}.jpg?v=${Date.now()}" onerror="this.src='https://placehold.co/60x60?text=No+Image'">
                          <span class="category-name">${cat.name}</span>
                      </div>
                      <form action="/manage_homepage.php/upload" method="POST" enctype="multipart/form-data">
                          <input type="hidden" name="category_id" value="${cat.id}">
                          <input type="file" name="image" accept="image/*" required>
                          <button type="submit">Upload</button>
                      </form>
                  </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
                <a href="/" style="color: #3498db; text-decoration: none;">← Go to Shop Homepage</a>
            </div>
        </div>
        
        <script>
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('success') === 'true') {
                document.getElementById('message').innerHTML = '<div class="success">Successfully updated category image!</div>';
            } else if (urlParams.get('error')) {
                document.getElementById('message').innerHTML = '<div class="error" style="background:#f8d7da;color:#721c24;padding:10px;border-radius:5px;margin-bottom:20px;">' + decodeURIComponent(urlParams.get('error')) + '</div>';
            }
        </script>
    </body>
    </html>
  `);
});

// Handle manage_homepage.php Login POST
app.post('/manage_homepage.php/login', (req, res) => {
  const { password } = req.body;
  if (password === 'admin123') {
    res.cookie('homepage_manager_logged_in', 'true', { httpOnly: true });
    return res.redirect('/manage_homepage.php');
  }
  res.redirect('/manage_homepage.php?error=Incorrect password');
});

// Handle manage_homepage.php Logout
app.get('/manage_homepage.php/logout', (req, res) => {
  res.clearCookie('homepage_manager_logged_in');
  res.redirect('/manage_homepage.php');
});

// Handle Category image uploads
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'uploads', 'categories');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const catId = req.body.category_id;
    cb(null, `${catId}.jpg`);
  }
});
const categoryUpload = multer({ storage: categoryStorage });

app.post('/manage_homepage.php/upload', categoryUpload.single('image'), (req, res) => {
  const loggedIn = getCookie(req, 'homepage_manager_logged_in') === 'true';
  if (!loggedIn) {
    return res.status(403).send("Forbidden");
  }
  res.redirect('/manage_homepage.php?success=true');
});

// Fallback for Single Page Application routing - serves index.html for all other paths
app.get('*', (req, res, next) => {
  // If the path points to a file, don't serve index.html (let it 404)
  if (req.path.includes('.')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled API/Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "An unexpected error occurred"
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
