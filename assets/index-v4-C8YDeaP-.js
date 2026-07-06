import { n as e } from "./rolldown-runtime-Bh1tDfsg.js";
import {
  A as t,
  B as n,
  C as r,
  D as i,
  E as a,
  F as o,
  G as s,
  H as c,
  I as l,
  J as u,
  K as d,
  L as f,
  M as p,
  N as m,
  O as h,
  P as g,
  R as _,
  S as v,
  T as y,
  U as b,
  V as x,
  W as S,
  X as C,
  Y as w,
  _ as T,
  a as E,
  b as D,
  c as O,
  d as k,
  f as A,
  g as j,
  h as M,
  i as N,
  j as ee,
  k as P,
  l as F,
  m as I,
  n as L,
  o as te,
  p as ne,
  q as re,
  r as ie,
  s as ae,
  t as R,
  u as z,
  v as oe,
  w as se,
  x as ce,
  y as le,
  z as ue,
} from "./vendor--CgQO9gb.js";
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var B = e(C()),
  V = w(),
  H = `/api/index.php`,
  de = `anaya_guest_cart`,
  fe = () => window.dispatchEvent(new Event(`guestCartUpdated`));
function pe() {
  try {
    return JSON.parse(localStorage.getItem(de) || `[]`);
  } catch {
    return [];
  }
}
function me() {
  return pe().reduce((e, t) => e + t.quantity, 0);
}
function U(e) {
  (localStorage.setItem(de, JSON.stringify(e)), fe());
}
function he(e, t = 1, variant) {
  let n = pe();
  const v = variant || e.size || "Standard";
  let r = n.findIndex((item) => item.productId === e._id && item.variant === v);
  if (r > -1) {
    n[r].quantity = Math.min(n[r].quantity + t, e.stock);
  } else {
    let varImg = "";
    if (variant && e.variants && Array.isArray(e.variants)) {
      const idx = e.variants.findIndex(c => c && c.toLowerCase().trim() === variant.toLowerCase().trim());
      if (idx !== -1 && e.images && e.images[idx]) {
        varImg = e.images[idx];
      }
    }
    if (!varImg) {
      varImg = e.images?.[0] || e.image || "";
    }
    n.push({
      productId: e._id,
      name: e.name,
      price: e.discountPrice ?? e.price,
      image: varImg,
      quantity: Math.min(t, e.stock),
      variant: v,
    });
  }
  U(n);
  return n;
}
function W(e, t, variant) {
  let n = pe();
  const v = variant || "Standard";
  if (t < 1) {
    n = n.filter((item) => !(item.productId === e && item.variant === v));
  } else {
    let r = n.findIndex((item) => item.productId === e && item.variant === v);
    r > -1 && (n[r].quantity = t);
  }
  return (U(n), n);
}
function ge(e, variant) {
  const v = variant || "Standard";
  let t = pe().filter((item) => !(item.productId === e && item.variant === v));
  return (U(t), t);
}
function _e() {
  (localStorage.removeItem(de), fe());
}
async function ve(e, t) {
  let n = pe();
  if (n.length !== 0) {
    try {
      await fetch(`${t}/cart/merge`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${e}`,
        },
        body: JSON.stringify({ items: n }),
      });
    } catch (e) {
      console.warn(`[GuestCart] Merge failed:`, e.message);
      return;
    }
    _e();
  }
}
var G = R(),
  K = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@400;500&display=swap');

  .login-section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding: 60px 20px;
    background: #fafaf7;
    font-family: 'DM Sans', sans-serif;
  }

  .login-card {
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 16px;
    padding: 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
    color: #1c1c1a;
  }

  .login-card h2 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #1c1c1a;
    line-height: 1.2;
  }

  .login-card p {
    font-size: 0.9rem;
    color: #7c7c75;
    margin-bottom: 24px;
    font-weight: 400;
  }

  .login-card form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .login-card label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #3d3d3a;
  }

  .login-card input {
    padding: 11px 14px;
    border: 1px solid #ddddd8;
    border-radius: 8px;
    font-size: 0.95rem;
    font-family: 'DM Sans', sans-serif;
    color: #1c1c1a;
    background: #ffffff;
    outline: none;
    transition: border-color 0.15s ease;
  }

  .login-card input:focus { border-color: #8b7355; }

  .login-card form button {
    width: 100%;
    padding: 13px;
    border-radius: 8px;
    border: 1.5px solid #1c1c1a;
    background: #1c1c1a;
    color: #ffffff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.2s ease;
    margin-top: 6px;
  }

  .login-card form button:hover { background: #3d3d3a; border-color: #3d3d3a; }

  .login-card form button:disabled {
    background: #ddddd8;
    border-color: #ddddd8;
    color: #9ca3af;
    cursor: not-allowed;
  }

  .popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(28, 28, 26, 0.4);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeInOverlay 0.3s ease;
  }

  @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }

  .popup-card {
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 20px;
    padding: 48px 40px 36px;
    text-align: center;
    width: 340px;
    position: relative;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
    animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.7) translateY(30px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .popup-icon-ring {
    width: 72px; height: 72px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
    background: #fafaf7; border: 1px solid #ddddd8;
  }

  .popup-checkmark {
    width: 32px; height: 32px;
    stroke: #1c1c1a; stroke-width: 2; fill: none;
    stroke-dasharray: 60; stroke-dashoffset: 60;
    animation: drawCheck 0.5s ease 0.2s forwards;
  }

  @keyframes drawCheck { to { stroke-dashoffset: 0; } }

  .popup-title {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 1.8rem; font-weight: 500; color: #1c1c1a; margin: 0 0 8px;
  }

  .popup-subtitle {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; color: #7c7c75; margin: 0 0 28px; line-height: 1.5;
  }

  .popup-name { color: #8b7355; font-weight: 500; }
  .popup-name-blue { color: #8b7355; font-weight: 500; }

  .popup-btn {
    width: 100%; padding: 14px; border-radius: 8px; border: none;
    color: #fff; background: #1c1c1a;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
    cursor: pointer; letter-spacing: 0.05em; text-transform: uppercase;
    transition: background 0.2s;
  }
  .popup-btn:hover { background: #3d3d3a; }

  .popup-close {
    position: absolute; top: 16px; right: 20px;
    background: none; border: none; color: #bcbcb8;
    font-size: 1.5rem; cursor: pointer; line-height: 1; transition: color 0.2s;
  }
  .popup-close:hover { color: #1c1c1a; }

  .auth-tabs { display: flex; border-bottom: 1px solid #ddddd8; margin-bottom: 28px; }

  .auth-tab {
    flex: 1; padding: 12px; background: none; border: none;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
    cursor: pointer; color: #bcbcb8; border-bottom: 2px solid transparent;
    transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.05em;
  }
  .auth-tab.active { color: #1c1c1a; border-bottom: 2px solid #1c1c1a; font-weight: 600; }
`;
function ye({ name: e, type: t = `login`, onClose: n }) {
  let r = t === `register`;
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, { children: K }),
      (0, G.jsx)(`div`, {
        className: `popup-overlay`,
        onClick: n,
        children: (0, G.jsxs)(`div`, {
          className: `popup-card`,
          onClick: (e) => e.stopPropagation(),
          children: [
            (0, G.jsx)(`button`, {
              className: `popup-close`,
              onClick: n,
              children: `×`,
            }),
            (0, G.jsx)(`div`, {
              className: `popup-icon-ring`,
              children: (0, G.jsx)(`svg`, {
                className: `popup-checkmark`,
                viewBox: `0 0 24 24`,
                children: (0, G.jsx)(`polyline`, { points: `4,12 9,17 20,6` }),
              }),
            }),
            (0, G.jsx)(`h2`, {
              className: `popup-title`,
              children: r ? `Account Created` : `Welcome Back`,
            }),
            (0, G.jsx)(`p`, {
              className: `popup-subtitle`,
              children: r
                ? (0, G.jsxs)(G.Fragment, {
                    children: [
                      `Account successfully created for `,
                      (0, G.jsx)(`span`, {
                        className: `popup-name-blue`,
                        children: e,
                      }),
                      `.`,
                      (0, G.jsx)(`br`, {}),
                      `You can now log in.`,
                    ],
                  })
                : (0, G.jsxs)(G.Fragment, {
                    children: [
                      `Hello, `,
                      (0, G.jsx)(`span`, {
                        className: `popup-name`,
                        children: e,
                      }),
                      `.`,
                      (0, G.jsx)(`br`, {}),
                      `You are now successfully signed in.`,
                    ],
                  }),
            }),
            (0, G.jsx)(`button`, {
              className: `popup-btn`,
              onClick: n,
              children: `Continue`,
            }),
          ],
        }),
      }),
    ],
  });
}
function be({ onSuccess: e }) {
  let [t, n] = (0, B.useState)(`login`),
    [r, i] = (0, B.useState)(!1),
    [a, o] = (0, B.useState)(``),
    [s, c] = (0, B.useState)(null),
    [l, u] = (0, B.useState)(!1),
    [d, f] = (0, B.useState)({ email: ``, password: `` }),
    [p, m] = (0, B.useState)({
      name: ``,
      email: ``,
      password: ``,
      confirm: ``,
    }),
    h = (e) => {
      (n(e), o(``));
    },
    g = async (e, t, n) => {
      (ve(e, H), c({ name: t, type: n }));
    };
  return l
    ? null
    : (0, G.jsxs)(G.Fragment, {
        children: [
          (0, G.jsx)(`style`, { children: K }),
          s &&
            (0, G.jsx)(ye, {
              name: s.name,
              type: s.type,
              onClose: () => {
                (c(null), u(!0), e && e());
              },
            }),
          (0, G.jsx)(`section`, {
            id: `login`,
            className: `login-section`,
            children: (0, G.jsxs)(`div`, {
              className: `login-card`,
              children: [
                (0, G.jsxs)(`div`, {
                  className: `auth-tabs`,
                  children: [
                    (0, G.jsx)(`button`, {
                      className: `auth-tab ${t === `login` ? `active` : ``}`,
                      onClick: () => h(`login`),
                      children: `Login`,
                    }),
                    (0, G.jsx)(`button`, {
                      className: `auth-tab ${t === `register` ? `active` : ``}`,
                      onClick: () => h(`register`),
                      children: `Register`,
                    }),
                  ],
                }),
                t === `login` &&
                  (0, G.jsxs)(G.Fragment, {
                    children: [
                      (0, G.jsx)(`h2`, { children: `Login to Your Account` }),
                      (0, G.jsx)(`p`, {
                        children: `Access your orders, saved favorites, and quick checkout.`,
                      }),
                      (0, G.jsxs)(`form`, {
                        onSubmit: (e) => e.preventDefault(),
                        children: [
                          (0, G.jsxs)(`label`, {
                            children: [
                              `Email`,
                              (0, G.jsx)(`input`, {
                                type: `email`,
                                placeholder: `you@example.com`,
                                value: d.email,
                                onChange: (e) => {
                                  (f({ ...d, email: e.target.value }), o(``));
                                },
                              }),
                            ],
                          }),
                          (0, G.jsxs)(`label`, {
                            children: [
                              `Password`,
                              (0, G.jsx)(`input`, {
                                type: `password`,
                                placeholder: `Enter password`,
                                value: d.password,
                                onChange: (e) => {
                                  (f({ ...d, password: e.target.value }),
                                    o(``));
                                },
                              }),
                            ],
                          }),
                          a &&
                            (0, G.jsxs)(`p`, {
                              style: {
                                color: `#a61d24`,
                                fontSize: `0.85rem`,
                                margin: `4px 0`,
                                textTransform: `none`,
                                letterSpacing: `0`,
                              },
                              children: [`❌ `, a],
                            }),
                          (0, G.jsx)(`button`, {
                            type: `button`,
                            onClick: async () => {
                              let { email: e, password: t } = d;
                              if (!e || !t)
                                return o(`Please enter email and password.`);
                              (i(!0), o(``));
                              try {
                                let n = await fetch(`${H}/auth/login`, {
                                    method: `POST`,
                                    headers: {
                                      "Content-Type": `application/json`,
                                    },
                                    body: JSON.stringify({
                                      email: e,
                                      password: t,
                                    }),
                                  }),
                                  r = await n.json();
                                if (!n.ok) return o(r.error || `Login failed.`);
                                (localStorage.setItem(`token`, r.token),
                                  localStorage.setItem(
                                    `user`,
                                    JSON.stringify(r.user),
                                  ),
                                  f({ email: ``, password: `` }),
                                  await g(r.token, r.user.name, `login`));
                              } catch {
                                o(
                                  `Cannot connect to server. Make sure backend is running.`,
                                );
                              } finally {
                                i(!1);
                              }
                            },
                            disabled: r,
                            children: r ? `Logging in...` : `Login`,
                          }),
                          (0, G.jsxs)(`p`, {
                            style: {
                              textAlign: `center`,
                              marginTop: `16px`,
                              fontSize: `0.85rem`,
                              color: `#6b7280`,
                            },
                            children: [
                              `Don't have an account?`,
                              ` `,
                              (0, G.jsx)(`span`, {
                                onClick: () => h(`register`),
                                style: {
                                  color: `#111827`,
                                  fontWeight: 500,
                                  cursor: `pointer`,
                                  textDecoration: `underline`,
                                },
                                children: `Register here`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                t === `register` &&
                  (0, G.jsxs)(G.Fragment, {
                    children: [
                      (0, G.jsx)(`h2`, { children: `Create an Account` }),
                      (0, G.jsx)(`p`, {
                        children: `Join us for exclusive deals and faster checkout.`,
                      }),
                      (0, G.jsxs)(`form`, {
                        onSubmit: (e) => e.preventDefault(),
                        children: [
                          (0, G.jsxs)(`label`, {
                            children: [
                              `Full Name`,
                              (0, G.jsx)(`input`, {
                                type: `text`,
                                placeholder: `Your full name`,
                                value: p.name,
                                onChange: (e) => {
                                  (m({ ...p, name: e.target.value }), o(``));
                                },
                              }),
                            ],
                          }),
                          (0, G.jsxs)(`label`, {
                            children: [
                              `Email`,
                              (0, G.jsx)(`input`, {
                                type: `email`,
                                placeholder: `you@example.com`,
                                value: p.email,
                                onChange: (e) => {
                                  (m({ ...p, email: e.target.value }), o(``));
                                },
                              }),
                            ],
                          }),
                          (0, G.jsxs)(`label`, {
                            children: [
                              `Password`,
                              (0, G.jsx)(`input`, {
                                type: `password`,
                                placeholder: `Min. 6 characters`,
                                value: p.password,
                                onChange: (e) => {
                                  (m({ ...p, password: e.target.value }),
                                    o(``));
                                },
                              }),
                            ],
                          }),
                          (0, G.jsxs)(`label`, {
                            children: [
                              `Confirm Password`,
                              (0, G.jsx)(`input`, {
                                type: `password`,
                                placeholder: `Repeat your password`,
                                value: p.confirm,
                                onChange: (e) => {
                                  (m({ ...p, confirm: e.target.value }), o(``));
                                },
                              }),
                            ],
                          }),
                          a &&
                            (0, G.jsxs)(`p`, {
                              style: {
                                color: `#a61d24`,
                                fontSize: `0.85rem`,
                                margin: `4px 0`,
                                textTransform: `none`,
                                letterSpacing: `0`,
                              },
                              children: [`❌ `, a],
                            }),
                          (0, G.jsx)(`button`, {
                            type: `button`,
                            onClick: async () => {
                              let {
                                name: e,
                                email: t,
                                password: n,
                                confirm: r,
                              } = p;
                              if (!e || !t || !n || !r)
                                return o(`Please fill all fields.`);
                              if (n !== r) return o(`Passwords do not match.`);
                              if (n.length < 6)
                                return o(
                                  `Password must be at least 6 characters.`,
                                );
                              (i(!0), o(``));
                              try {
                                let r = await fetch(`${H}/auth/register`, {
                                    method: `POST`,
                                    headers: {
                                      "Content-Type": `application/json`,
                                    },
                                    body: JSON.stringify({
                                      name: e,
                                      email: t,
                                      password: n,
                                    }),
                                  }),
                                  i = await r.json();
                                if (!r.ok)
                                  return o(i.error || `Registration failed.`);
                                (localStorage.setItem(`token`, i.token),
                                  localStorage.setItem(
                                    `user`,
                                    JSON.stringify(i.user),
                                  ),
                                  m({
                                    name: ``,
                                    email: ``,
                                    password: ``,
                                    confirm: ``,
                                  }),
                                  await g(i.token, i.user.name, `register`));
                              } catch {
                                o(
                                  `Cannot connect to server. Make sure backend is running.`,
                                );
                              } finally {
                                i(!1);
                              }
                            },
                            disabled: r,
                            children: r
                              ? `Creating Account...`
                              : `Create Account`,
                          }),
                          (0, G.jsxs)(`p`, {
                            style: {
                              textAlign: `center`,
                              marginTop: `16px`,
                              fontSize: `0.85rem`,
                              color: `#6b7280`,
                            },
                            children: [
                              `Already have an account?`,
                              ` `,
                              (0, G.jsx)(`span`, {
                                onClick: () => h(`login`),
                                style: {
                                  color: `#111827`,
                                  fontWeight: 500,
                                  cursor: `pointer`,
                                  textDecoration: `underline`,
                                },
                                children: `Login here`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
          }),
        ],
      });
}
var q = {
    fullName: ``,
    mobile: ``,
    houseNo: ``,
    street: ``,
    landmark: ``,
    city: ``,
    state: ``,
    country: `India`,
    pincode: ``,
    addressType: `Home`,
  },
  J = {
    width: `100%`,
    padding: `10px 13px`,
    border: `1px solid #e0e0e0`,
    borderRadius: `7px`,
    fontSize: `14px`,
    fontFamily: `inherit`,
    color: `#1c1c1a`,
    outline: `none`,
    boxSizing: `border-box`,
    transition: `border-color 0.15s`,
  },
  xe = { ...J, borderColor: `#c62828` },
  Y = {
    fontSize: `11px`,
    fontWeight: `600`,
    textTransform: `uppercase`,
    letterSpacing: `0.07em`,
    color: `#777`,
    marginBottom: `5px`,
    display: `block`,
  },
  Se = (e) => ({
    width: `100%`,
    padding: `13px`,
    background: e ? `#aaa` : `#1c1c1a`,
    color: `#fff`,
    border: `none`,
    borderRadius: `7px`,
    fontSize: `14px`,
    fontWeight: `600`,
    cursor: e ? `not-allowed` : `pointer`,
    fontFamily: `inherit`,
    transition: `background 0.2s`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    gap: `8px`,
    marginTop: `6px`,
  });
function Ce({ onComplete: e, onSwitchToLogin: t }) {
  let [n, i] = (0, B.useState)(`phone`),
    [a, o] = (0, B.useState)(``),
    [s, c] = (0, B.useState)(``),
    [l, u] = (0, B.useState)(``),
    [d, f] = (0, B.useState)(q),
    [m, h] = (0, B.useState)(``),
    [g, _] = (0, B.useState)(!1),
    [b, x] = (0, B.useState)(``),
    [S, C] = (0, B.useState)({}),
    [resendCooldown, setResendCooldown] = (0, B.useState)(0),
    w = (e, t) => f((n) => ({ ...n, [e]: t }));
  (0, B.useEffect)(() => {
    if (resendCooldown > 0) {
      let t = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendCooldown]);
  let E = async () => {
      if (!/^\d{10}$/.test(a.trim()))
        return x(`Enter a valid 10-digit mobile number.`);
      (x(``), _(!0));
      try {
        let e = await fetch(`${H}/guest/send-otp`, {
            method: `POST`,
            headers: { "Content-Type": `application/json` },
            body: JSON.stringify({ phone: a.trim() }),
          }),
          t = await e.json();
        if (!e.ok) return x(t.error || `Failed to send OTP.`);
        i(`otp`);
      } catch {
        x(`Network error. Please try again.`);
      } finally {
        _(!1);
      }
    },
    D = async () => {
      if (s.trim().length !== 6) return x(`Enter the 6-digit OTP.`);
      if (!l.trim()) return x(`Please enter your full name.`);
      (x(``), _(!0));
      try {
        let e = await fetch(`${H}/guest/verify-otp`, {
            method: `POST`,
            headers: { "Content-Type": `application/json` },
            body: JSON.stringify({
              phone: a.trim(),
              otp: s.trim(),
              name: l.trim(),
            }),
          }),
          t = await e.json();
        if (!e.ok) return x(t.error || `OTP verification failed.`);
        (h(t.token || t.guestToken),
          f((e) => ({ ...e, fullName: l.trim(), mobile: a.trim() })),
          i(`address`));
      } catch {
        x(`Network error. Please try again.`);
      } finally {
        _(!1);
      }
    },
    O = () => {
      let t = [
          `fullName`,
          `mobile`,
          `houseNo`,
          `street`,
          `city`,
          `state`,
          `country`,
          `pincode`,
        ],
        n = {};
      (t.forEach((e) => {
        d[e]?.trim() || (n[e] = `Required`);
      }),
        d.pincode &&
          !/^\d{6}$/.test(d.pincode.trim()) &&
          (n.pincode = `6-digit pincode required`),
        C(n),
        !Object.keys(n).length && e(m, { name: l.trim(), phone: a.trim() }, d));
    },
    k = [
      { key: `phone`, label: `Verify Number`, Icon: T },
      { key: `otp`, label: `Enter OTP`, Icon: y },
      { key: `address`, label: `Delivery`, Icon: v },
    ],
    A = k.findIndex((e) => e.key === n);
  return (0, G.jsxs)(`div`, {
    children: [
      (0, G.jsx)(`div`, {
        className: `gc-step-indicator`,
        style: {
          display: `flex`,
          alignItems: `center`,
          marginBottom: `24px`,
          gap: `0`,
        },
        children: k.map((e, t) => {
          let n = t < A,
            r = t === A,
            i = e.Icon;
          return (0, G.jsxs)(
            B.Fragment,
            {
              children: [
                (0, G.jsxs)(`div`, {
                  style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: `4px`,
                  },
                  children: [
                    (0, G.jsx)(`div`, {
                      className: `gc-step-circle`,
                      style: {
                        width: `32px`,
                        height: `32px`,
                        borderRadius: `50%`,
                        background: n || r ? `#1c1c1a` : `#e8e8e8`,
                        color: n || r ? `#fff` : `#aaa`,
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        transition: `background 0.2s`,
                      },
                      children: (0, G.jsx)(i, { size: 14 }),
                    }),
                    (0, G.jsx)(`span`, {
                      className: `gc-step-label`,
                      style: {
                        fontSize: `10px`,
                        color: r ? `#1c1c1a` : `#aaa`,
                        fontWeight: r ? `700` : `400`,
                        whiteSpace: `nowrap`,
                      },
                      children: e.label,
                    }),
                  ],
                }),
                t < k.length - 1 &&
                  (0, G.jsx)(`div`, {
                    style: {
                      flex: 1,
                      height: `2px`,
                      background: t < A ? `#1c1c1a` : `#e8e8e8`,
                      margin: `0 6px`,
                      marginBottom: `16px`,
                      transition: `background 0.3s`,
                    },
                  }),
              ],
            },
            e.key,
          );
        }),
      }),
      n === `phone` &&
        (0, G.jsxs)(`div`, {
          style: { display: `flex`, flexDirection: `column`, gap: `14px` },
          children: [
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`label`, { style: Y, children: `Mobile Number` }),
                (0, G.jsxs)(`div`, {
                  style: {
                    display: `flex`,
                    border: `1px solid #e0e0e0`,
                    borderRadius: `7px`,
                    overflow: `hidden`,
                  },
                  children: [
                    (0, G.jsx)(`span`, {
                      style: {
                        padding: `10px 12px`,
                        background: `#f5f5f5`,
                        fontSize: `14px`,
                        color: `#555`,
                        borderRight: `1px solid #e0e0e0`,
                        flexShrink: 0,
                        display: `flex`,
                        alignItems: `center`,
                      },
                      children: `+91`,
                    }),
                    (0, G.jsx)(`input`, {
                      type: `tel`,
                      maxLength: 10,
                      placeholder: `10-digit mobile number`,
                      value: a,
                      onChange: (e) => {
                        (o(e.target.value.replace(/\D/g, ``)), x(``));
                      },
                      style: { ...J, border: `none`, borderRadius: 0, flex: 1 },
                      onKeyDown: (e) => e.key === `Enter` && E(),
                      autoFocus: !0,
                    }),
                  ],
                }),
              ],
            }),
            b &&
              (0, G.jsx)(`p`, {
                style: { color: `#c62828`, fontSize: `12px`, margin: 0 },
                children: b,
              }),
            (0, G.jsxs)(`button`, {
              onClick: E,
              disabled: g,
              style: Se(g),
              children: [
                g
                  ? (0, G.jsx)(r, {
                      size: 16,
                      style: { animation: `spin 1s linear infinite` },
                    })
                  : (0, G.jsx)(T, { size: 15 }),
                g ? `Sending...` : `Send OTP`,
              ],
            }),
            (0, G.jsxs)(`div`, {
              style: { textAlign: `center`, fontSize: `12px`, color: `#888` },
              children: [
                `Already have an account?`,
                ` `,
                (0, G.jsx)(`button`, {
                  onClick: t,
                  style: {
                    background: `none`,
                    border: `none`,
                    color: `#1c1c1a`,
                    fontWeight: `600`,
                    cursor: `pointer`,
                    fontSize: `12px`,
                    padding: 0,
                    textDecoration: `underline`,
                  },
                  children: `Login instead`,
                }),
              ],
            }),
          ],
        }),
      n === `otp` &&
        (0, G.jsxs)(`div`, {
          style: { display: `flex`, flexDirection: `column`, gap: `14px` },
          children: [
            (0, G.jsxs)(`div`, {
              style: {
                padding: `10px 14px`,
                background: `#f0fdf4`,
                border: `1px solid #bbf7d0`,
                borderRadius: `7px`,
                fontSize: `12px`,
                color: `#166534`,
              },
              children: [
                `OTP sent to +91 `,
                a,
                `. (For demo, use code: 123456)`,
                ` `,
                (0, G.jsx)(`button`, {
                  onClick: () => {
                    (i(`phone`), c(``), x(``));
                  },
                  style: {
                    background: `none`,
                    border: `none`,
                    color: `#166534`,
                    cursor: `pointer`,
                    fontSize: `12px`,
                    textDecoration: `underline`,
                    padding: 0,
                  },
                  children: `Change number`,
                }),
              ],
            }),
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`label`, { style: Y, children: `Enter OTP` }),
                (0, G.jsx)(`input`, {
                  type: `tel`,
                  maxLength: 6,
                  placeholder: `6-digit OTP`,
                  value: s,
                  onChange: (e) => {
                    (c(e.target.value.replace(/\D/g, ``)), x(``));
                  },
                  style: {
                    ...J,
                    letterSpacing: `0.2em`,
                    fontSize: `18px`,
                    textAlign: `center`,
                  },
                  autoFocus: !0,
                }),
              ],
            }),
            (0, G.jsxs)(`div`, {
              children: [
                (0, G.jsx)(`label`, { style: Y, children: `Your Full Name` }),
                (0, G.jsx)(`input`, {
                  type: `text`,
                  placeholder: `Name for delivery`,
                  value: l,
                  onChange: (e) => {
                    (u(e.target.value), x(``));
                  },
                  style: J,
                  onKeyDown: (e) => e.key === `Enter` && D(),
                }),
              ],
            }),
            b &&
              (0, G.jsx)(`p`, {
                style: { color: `#c62828`, fontSize: `12px`, margin: 0 },
                children: b,
              }),
            (0, G.jsxs)(`button`, {
              onClick: D,
              disabled: g,
              style: Se(g),
              children: [
                g
                  ? (0, G.jsx)(r, {
                      size: 16,
                      style: { animation: `spin 1s linear infinite` },
                    })
                  : (0, G.jsx)(y, { size: 15 }),
                g ? `Verifying...` : `Verify & Continue`,
              ],
            }),
            (0, G.jsxs)(`div`, {
              style: { textAlign: `center`, fontSize: `12px`, marginTop: `10px` },
              children: [
                resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : (0, G.jsx)(`button`, {
                      type: `button`,
                      onClick: async () => {
                        setResendCooldown(30);
                        await E();
                      },
                      style: {
                        background: `none`,
                        border: `none`,
                        color: `#8b7355`,
                        fontWeight: `600`,
                        cursor: `pointer`,
                        padding: 0,
                        textDecoration: `underline`
                      },
                      children: `Resend OTP`
                    })
              ]
            }),
          ],
        }),
      n === `address` &&
        (0, G.jsxs)(`div`, {
          style: { display: `flex`, flexDirection: `column`, gap: `12px` },
          children: [
            (0, G.jsxs)(`div`, {
              className: `gc-addr-grid`,
              children: [
                (0, G.jsxs)(`div`, {
                  style: { gridColumn: `1 / -1` },
                  children: [
                    (0, G.jsxs)(`label`, {
                      style: Y,
                      children: [
                        `Full Name `,
                        (0, G.jsx)(`span`, {
                          style: { color: `#c62828` },
                          children: `*`,
                        }),
                      ],
                    }),
                    (0, G.jsx)(`input`, {
                      value: d.fullName,
                      onChange: (e) => w(`fullName`, e.target.value),
                      style: S.fullName ? xe : J,
                      placeholder: `Recipient name`,
                    }),
                    S.fullName &&
                      (0, G.jsx)(`span`, {
                        style: { fontSize: `11px`, color: `#c62828` },
                        children: S.fullName,
                      }),
                  ],
                }),
                (0, G.jsxs)(`div`, {
                  children: [
                    (0, G.jsxs)(`label`, {
                      style: Y,
                      children: [
                        `Mobile `,
                        (0, G.jsx)(`span`, {
                          style: { color: `#c62828` },
                          children: `*`,
                        }),
                      ],
                    }),
                    (0, G.jsx)(`input`, {
                      value: d.mobile,
                      readOnly: !0,
                      style: { ...J, background: `#f5f5f5`, color: `#888` },
                    }),
                  ],
                }),
                (0, G.jsxs)(`div`, {
                  children: [
                    (0, G.jsxs)(`label`, {
                      style: Y,
                      children: [
                        `Pincode `,
                        (0, G.jsx)(`span`, {
                          style: { color: `#c62828` },
                          children: `*`,
                        }),
                      ],
                    }),
                    (0, G.jsx)(`input`, {
                      value: d.pincode,
                      onChange: (e) =>
                        w(
                          `pincode`,
                          e.target.value.replace(/\D/g, ``).slice(0, 6),
                        ),
                      style: S.pincode ? xe : J,
                      placeholder: `6-digit`,
                      maxLength: 6,
                    }),
                    S.pincode &&
                      (0, G.jsx)(`span`, {
                        style: { fontSize: `11px`, color: `#c62828` },
                        children: S.pincode,
                      }),
                  ],
                }),
                (0, G.jsxs)(`div`, {
                  style: { gridColumn: `1 / -1` },
                  children: [
                    (0, G.jsxs)(`label`, {
                      style: Y,
                      children: [
                        `House / Flat No. `,
                        (0, G.jsx)(`span`, {
                          style: { color: `#c62828` },
                          children: `*`,
                        }),
                      ],
                    }),
                    (0, G.jsx)(`input`, {
                      value: d.houseNo,
                      onChange: (e) => w(`houseNo`, e.target.value),
                      style: S.houseNo ? xe : J,
                      placeholder: `e.g. 12B, Tower A`,
                    }),
                    S.houseNo &&
                      (0, G.jsx)(`span`, {
                        style: { fontSize: `11px`, color: `#c62828` },
                        children: S.houseNo,
                      }),
                  ],
                }),
                (0, G.jsxs)(`div`, {
                  style: { gridColumn: `1 / -1` },
                  children: [
                    (0, G.jsxs)(`label`, {
                      style: Y,
                      children: [
                        `Street / Area `,
                        (0, G.jsx)(`span`, {
                          style: { color: `#c62828` },
                          children: `*`,
                        }),
                      ],
                    }),
                    (0, G.jsx)(`input`, {
                      value: d.street,
                      onChange: (e) => w(`street`, e.target.value),
                      style: S.street ? xe : J,
                      placeholder: `Street, locality, area`,
                    }),
                    S.street &&
                      (0, G.jsx)(`span`, {
                        style: { fontSize: `11px`, color: `#c62828` },
                        children: S.street,
                      }),
                  ],
                }),
                (0, G.jsxs)(`div`, {
                  style: { gridColumn: `1 / -1` },
                  children: [
                    (0, G.jsxs)(`label`, {
                      style: Y,
                      children: [
                        `Landmark `,
                        (0, G.jsx)(`span`, {
                          style: {
                            fontSize: `10px`,
                            fontWeight: 400,
                            textTransform: `none`,
                            color: `#aaa`,
                          },
                          children: `(optional)`,
                        }),
                      ],
                    }),
                    (0, G.jsx)(`input`, {
                      value: d.landmark,
                      onChange: (e) => w(`landmark`, e.target.value),
                      style: J,
                      placeholder: `Near bus stand, opposite temple...`,
                    }),
                  ],
                }),
                (0, G.jsxs)(`div`, {
                  children: [
                    (0, G.jsxs)(`label`, {
                      style: Y,
                      children: [
                        `City `,
                        (0, G.jsx)(`span`, {
                          style: { color: `#c62828` },
                          children: `*`,
                        }),
                      ],
                    }),
                    (0, G.jsx)(`input`, {
                      value: d.city,
                      onChange: (e) => w(`city`, e.target.value),
                      style: S.city ? xe : J,
                      placeholder: `City`,
                    }),
                    S.city &&
                      (0, G.jsx)(`span`, {
                        style: { fontSize: `11px`, color: `#c62828` },
                        children: S.city,
                      }),
                  ],
                }),
                (0, G.jsxs)(`div`, {
                  children: [
                    (0, G.jsxs)(`label`, {
                      style: Y,
                      children: [
                        `State `,
                        (0, G.jsx)(`span`, {
                          style: { color: `#c62828` },
                          children: `*`,
                        }),
                      ],
                    }),
                    (0, G.jsx)(`input`, {
                      value: d.state,
                      onChange: (e) => w(`state`, e.target.value),
                      style: S.state ? xe : J,
                      placeholder: `State`,
                    }),
                    S.state &&
                      (0, G.jsx)(`span`, {
                        style: { fontSize: `11px`, color: `#c62828` },
                        children: S.state,
                      }),
                  ],
                }),
                (0, G.jsxs)(`div`, {
                  children: [
                    (0, G.jsxs)(`label`, {
                      style: Y,
                      children: [
                        `Country `,
                        (0, G.jsx)(`span`, {
                          style: { color: `#c62828` },
                          children: `*`,
                        }),
                      ],
                    }),
                    (0, G.jsx)(`input`, {
                      value: d.country,
                      onChange: (e) => w(`country`, e.target.value),
                      style: S.country ? xe : J,
                    }),
                  ],
                }),
                (0, G.jsxs)(`div`, {
                  children: [
                    (0, G.jsx)(`label`, { style: Y, children: `Address Type` }),
                    (0, G.jsxs)(`select`, {
                      value: d.addressType,
                      onChange: (e) => w(`addressType`, e.target.value),
                      style: { ...J, cursor: `pointer` },
                      children: [
                        (0, G.jsx)(`option`, {
                          value: `Home`,
                          children: `Home`,
                        }),
                        (0, G.jsx)(`option`, {
                          value: `Work`,
                          children: `Work`,
                        }),
                        (0, G.jsx)(`option`, {
                          value: `Other`,
                          children: `Other`,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, G.jsxs)(`button`, {
              onClick: O,
              style: Se(!1),
              children: [
                (0, G.jsx)(p, { size: 15 }),
                ` Save & Proceed to Payment`,
              ],
            }),
          ],
        }),
      (0, G.jsx)(`style`, {
        children: `
        @keyframes spin { to { transform: rotate(360deg); } }
        .gc-addr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .gc-addr-grid {
            grid-template-columns: 1fr !important;
          }
          .gc-addr-grid > div[style*="1 / -1"] {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 380px) {
          .gc-step-circle { width: 26px !important; height: 26px !important; }
          .gc-step-label { font-size: 9px !important; }
        }
      `,
      }),
    ],
  });
}
var X = `All requests for returns must be initiated by the customer within 3 days of receiving the product.
In case of return/refund, Rs 200 will be deducted for delivery and handling charges. Exchange can be placed within 3 days of receiving the order with no extra cost. Exchange can be placed only once.
To initiate a return, please send us an email at
padminivastra@gmail.com or WhatsApp at 9633521642.
Please ensure the merchandise is unused, unworn, undamaged, and in its original
condition with all the tags and labels intact. Please refer to our standard policy for more details.`,
  Z = {
    "Sunbliss Cotton Bedsheet": {
      overview: `• Add a joyful dash of floral romance to your home decor to brighten up your festive season with our latest home linen collection.
• This bed cover has been constructed out of rustic Cotton and is hand block printed with floral motifs suspended against a yellow base. The bedcover is framed with traditional border bands that elevate the look.
• Shop the entire line for a coordinated look that spells timeless floral charm.`,
      size: `Size: L (228 cm X 274 cm)`,
      material: `Colour: Golden Yellow
Fabric: 20s Pure Cotton
Note: There may be slight variations in the colours of the fabric in the image you may see on your own computer or phone to the colours of the actual products. This is due to varying electronic screens.`,
      careGuide: `Dryclean Suggested
Use Cold Water
Use Mild Detergent
Do Not Bleach
Dry in Shade
Medium Iron if necessary
#Follow Washcare Instructions Carefully.`,
      shippingRefund: X,
    },
    "Floral Breeze Cotton Bedsheet": {
      overview: `• 'Powder Touch' is our latest home collection by Kilol that is designed with floral motifs that exude a timeless old-world charm.
• The bed cover is made in 20s Cotton fabric, which is hand block printed with a classic floral jaal framed with floral motifs and border bands- all rendered in a soft palette of pinks and lilac.
• Pair it with cushion and pillow covers from the same collection for a classic coordinated set to brighten up your home decor.`,
      size: `Size: L (228 cm X 274 cm)`,
      material: `Colour: Green
Fabric: 20s Pure Cotton
Note: There may be slight variations in the colours of the fabric in the image you may see on your own computer or phone to the colours of the actual products. This is due to varying electronic screens.`,
      careGuide: `Dryclean Suggested
Use Cold Water
Use Mild Detergent
Do Not Bleach
Dry in Shade
Medium Iron if necessary
#Follow Washcare Instructions Carefully.`,
      shippingRefund: X,
    },
    "Gulnaar Cotton Bedsheet": {
      overview: `• Bring home an ethnic vibe with a modern spin with our latest range of home furnishing called 'Red' designed in premium cottons with our signature pattern in ravishing reds.
• The bed cover is made in 20s Cotton fabric, which is hand printed with floral motifs which is perfect for the festive season.`,
      size: `Size: L (228 cm X 274 cm)`,
      material: `Colour: White base, Red
Fabric: 20s Pure Cotton
Note: There may be slight variations in the colours of the fabric in the image you may see on your own computer or phone to the colours of the actual products. This is due to varying electronic screens.`,
      careGuide: `Dryclean Suggested
Use Cold Water
Use Mild Detergent
Do Not Bleach
Dry in Shade
Medium Iron if necessary
#Follow Washcare Instructions Carefully.`,
      shippingRefund: X,
    },
    "Peachbliss Cotton Bedsheet": {
      overview: `• Get into the spirit of autumn with this beautiful home collection designed with a bold floral pattern in warm, spiced hues.
• The 20s Cotton bedcover is hand block printed with a gorgeous floral jaal and framed with ornate border bands.`,
      size: `Size: L (228 cm X 274 cm)`,
      material: `Colour: Peach, Green and White
Fabric: 20s Pure Cotton
Note: There may be slight variations in the colours of the fabric in the image you may see on your own computer or phone to the colours of the actual products. This is due to varying electronic screens.`,
      careGuide: `Dryclean Suggested
Use Cold Water
Use Mild Detergent
Do Not Bleach
Dry in Shade
Medium Iron if necessary
#Follow Washcare Instructions Carefully.`,
      shippingRefund: X,
    },
    "Floral Green Cotton Bedsheet | 2 Pillow covers": {
      overview: `This Bedsheet's magic keeps you cool, even in scorching heat! Made from 100% pure cotton ,it's the perfect mix of comfort and style. The bold colors and top-notch quality will make your room pop, and soon, you'll be hooked and asking for more!`,
      size: `Size: 90 x 108 Inches
Pillow Cover Size: 28 x 19 Inches `,
      material: `Material: 100% Pure Soft Cotton
Thread Count: 240
Includes 2 Cotton Pillow Covers
Note: There may be slight variations in the colours of the fabric in the image you may see on your own computer or phone to the colours of the actual products. This is due to varying electronic screens.`,
      careGuide: `Machine wash in cold water on a gentle cycle.
Wash with similar home linens only.
Line dry in the shade, with the reverse side facing up.
Do not tumble dry.
Iron on low heat if necessary. `,
      shippingRefund: X,
    },
    "Purple Flora Cotton Bedsheet | 2 Pillow covers": {
      overview: `Rediscover comfort with this Purple Flora - Kora Cotton.
Crafted from pure cotton and printed for a soft and earthy finish that only gets better with time. Naturally breathable and made to be lived in—not just looked at.`,
      size: `Size:- Bedsheet ( 274 CM x 274 CM)
Pillow Cover (46 CM x 69 CM)`,
      material: `Thread Count :- 180TC
Fabric:- 100% Pure Cotton
Including component:- 1 Bedsheet and 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Pink Petals Cotton Bedsheet | 2 Pillow covers": {
      overview: `Rediscover comfort with this Pink Petals Flora - Kora Cotton.
Crafted from pure cotton and printed for a soft and earthy finish that only gets better with time. Naturally breathable and made to be lived in—not just looked at.`,
      size: `Size:- Bedsheet ( 274 CM x 274 CM)
Pillow Cover (46 CM x 69 CM)`,
      material: `Thread Count :- 180TC
Fabric:- 100% Pure Cotton
Including component:- 1 Bedsheet and 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Pink Flora Cotton Bedsheet | 2 Pillow covers": {
      overview: `Rediscover comfort with this Pink Flora - Kora Cotton.
Crafted from pure cotton and printed for a soft and earthy finish that only gets better with time. Naturally breathable and made to be lived in—not just looked at.`,
      size: `Size:- Bedsheet ( 274 CM x 274 CM)
Pillow Cover (46 CM x 69 CM)`,
      material: `Thread Count :- 180TC
Fabric:- 100% Pure Cotton
Including component:- 1 Bedsheet and 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Floral Heritage Red Bedsheet | 2 Pillow covers": {
      overview: `• Add a joyful dash of floral romance to your home decor to brighten up your festive season with our latest home linen collection.
• This bed cover has been constructed out of rustic Cotton and is hand block printed with floral motifs. The bedsheet is framed with traditional border bands that elevate the look.
• Shop the entire line for a coordinated look that spells timeless floral charm.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Fabric:- 100% Pure Cotton
Including component:- 1 Bedsheet and 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Floral Heritage Grey Bedsheet | 2 Pillow covers": {
      overview: `• Add a joyful dash of floral romance to your home decor to brighten up your festive season with our latest home linen collection.
• This bed cover has been constructed out of rustic Cotton and is hand block printed with floral motifs. The bedsheet is framed with traditional border bands that elevate the look.
• Shop the entire line for a coordinated look that spells timeless floral charm.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Fabric:- 100% Pure Cotton
Including component:- 1 Bedsheet and 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Purple Flora Cotton Fitted Bedsheet | 2 Pillow covers": {
      overview: `Rediscover comfort with Purple Flora - Kora Cotton. Crafted from raw, homegrown cotton and pigment-printed for a soft, earthy finish that only gets better with time. Naturally breathable and made to be lived in—not just looked at.`,
      size: `Size: 183*198*25 cm`,
      material: `Thread Count :- 180TC
Fabric:- 100% Pure Cotton
Including component:- 1 Bedsheet and 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Mosaic Mist Cotton Fitted Bedsheet | 2 Pillow covers": {
      overview: `Rediscover comfort with Mosaic Mist - Kora Cotton. Crafted from raw, homegrown cotton and pigment-printed for a soft, earthy finish that only gets better with time. Naturally breathable and made to be lived in—not just looked at.`,
      size: `Size: 183*198*25 cm`,
      material: `Thread Count :- 180TC
Fabric:- 100% Pure Cotton
Including component:- 1 Bedsheet and 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Soft Peach Cotton Kantha Bedcover": {
      overview: `Wrap yourself in the luxurious warmth of soft peach, where comfort meets style. Pure cotton.

Beautifully handcrafted by artisans in India, this Kantha bedcover is perfect as a bedspread for double beds. `,
      size: `Size: 90 x 108 inches (220 cm x 275 cm)`,
      material: `Double layered, made with 100% cotton
This listing includes bedspread only. Pillow covers not included`,
      careGuide: `Hand or machine wash in cold
Dry-clean suggested Use mild or liquid detergent only
Do not use hot water to avoid fading
Dry in shade to maintain fabric quality`,
      shippingRefund: X,
    },
    "CloudQuilt (Denim) Premium Cotton Quilted Bedcover with Pillow Covers": {
      overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "CloudQuilt (Peach) Premium Cotton Quilted Bedcover with Pillow Covers": {
      overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "CloudQuilt (Sage) Premium Cotton Quilted Bedcover with Pillow Covers": {
      overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "CloudQuilt (Aqua) Premium Cotton Quilted Bedcover with Pillow Covers": {
      overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "CloudQuilt (Pistachio) Premium Cotton Quilted Bedcover with Pillow Covers":
      {
        overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
        size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
        material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
        careGuide: `Wash Dark Colors Separately.`,
        shippingRefund: X,
      },
    "CloudQuilt (Beige) Premium Cotton Quilted Bedcover with Pillow Covers": {
      overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "CloudQuilt (Grey) Premium Cotton Quilted Bedcover with Pillow Covers": {
      overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "CloudQuilt (Cream) Premium Cotton Quilted Bedcover with Pillow Covers": {
      overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "CloudQuilt (Walnut) Premium Cotton Quilted Bedcover with Pillow Covers": {
      overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "CloudQuilt (Rust) Premium Cotton Quilted Bedcover with Pillow Covers": {
      overview: `The Quilted King Size Bedcover offers a luxurious and soft feel with its quilted texture, providing both comfort and style. It fits perfectly on double and king-size beds. The set comes with two pillow covers, making it a complete bedding solution. Durable and easy to maintain, this bedspread is designed for everyday use, ensuring long-lasting quality and warmth. Ideal for adding a cozy yet elegant touch to your bedroom.`,
      size: `Size: Bedcover (224cm x 274cm)
Pillow Cover (46cmx 69cm)`,
      material: `Thread Count :- 300TC
Fabric:- 100% Pure Cotton
Including Component:- 1 Bedcover, 2 Pillow Cover
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Tulip Pink Cotton Single Dohar": {
      overview: `Reversible Pure Cotton Single Size Dohar. `,
      size: `Size: 132*224cm`,
      material: `Fabric:- 100% Pure Cotton
Including Component:- 1 Dohar
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Tulip Blue Cotton Single Dohar": {
      overview: `Reversible Pure Cotton Single Size Dohar. `,
      size: `Size: 132*224cm`,
      material: `Fabric:- 100% Pure Cotton
Including Component:- 1 Dohar
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Floral Blue Cotton Single Dohar": {
      overview: `Reversible Pure Cotton Single Size Dohar. `,
      size: `Size: 132*224cm`,
      material: `Fabric:- 100% Pure Cotton
Including Component:- 1 Dohar
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Floral Pink Cotton Single Dohar": {
      overview: `Reversible Pure Cotton Single Size Dohar. `,
      size: `Size: 132*224cm`,
      material: `Fabric:- 100% Pure Cotton
Including Component:- 1 Dohar
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Soft Blue Cotton Double Dohar": {
      overview: `Reversible Pure Cotton Single Size Dohar. `,
      size: `Size: 210*240cm`,
      material: `Fabric:- 100% Pure Cotton
Including Component:- 1 Dohar
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Soft White Cotton Double Dohar": {
      overview: `Reversible Pure Cotton Single Size Dohar. `,
      size: `Size: 210*240cm`,
      material: `Fabric:- 100% Pure Cotton
Including Component:- 1 Dohar
Softness:- 100% Pure Cotton that makes your bed soft like a feather`,
      careGuide: `Wash Dark Colors Separately.`,
      shippingRefund: X,
    },
    "Sunbliss Cotton Pillow covers | Set of 2": {
      overview: `This pillow cover is part of our cheery 'Sunbliss'' home collection. The colour is vibrant with golden shades of yellow to brighten up your decor.  Match it with the bed cover from the same collection or use it as an accent on white bed linen to add a touch of allure instantly into your home this festive season.`,
      size: `Size: 18" X 26"`,
      material: `Colour: Yellow
Fabric: 40s Cotton
Note: There may be slight variations in the colours of the fabric in the image you may see on your own computer or phone to the colours of the actual products. This is due to varying electronic screens.`,
      careGuide: `Dryclean Suggested
Use Cold Water
Use Mild Detergent
Do Not Bleach
Dry in Shade
Medium Iron if necessary
#Follow Washcare Instructions Carefully.`,
      shippingRefund: X,
    },
  },
  we = {
    overview: `A premium quality product crafted with care. Details will be updated shortly.`,
    size: `Please refer to the size label on the product. Contact us for sizing assistance.`,
    material: `Made from high-quality materials. Exact composition listed on the product tag.`,
    careGuide: `Machine wash cold with like colours. Gentle cycle. Do not bleach. Tumble dry low. Iron on medium heat.`,
    shippingRefund: X,
  };
function Te(e) {
  if (!e) return we;
  if (Z[e]) return Z[e];
  let t = e.trim();
  if (Z[t]) return Z[t];
  let n = t.toLowerCase(),
    r = Object.keys(Z),
    i = r.find((e) => e.trim().toLowerCase() === n);
  if (i) return Z[i];
  let a = new Set([
      `cotton`,
      `pure`,
      `premium`,
      `with`,
      `and`,
      `or`,
      `the`,
      `a`,
      `in`,
      `of`,
      `set`,
      `size`,
      `covers`,
      `cover`,
      `including`,
      `component`,
      `reversible`,
      `bedcover`,
      `bedsheet`,
      `dohar`,
      `fitted`,
      `quilted`,
      `kantha`,
      `pillow`,
    ]),
    o = (e) =>
      e
        .toLowerCase()
        .split(/[\s|()\[\],]+/)
        .filter((e) => e.length > 1 && !a.has(e) && !/^\d+$/.test(e)),
    s = o(t),
    c = null,
    l = 0;
  for (let e of r) {
    let t = s.filter((t) => o(e).includes(t)).length;
    t > l && ((l = t), (c = e));
  }
  return c && l > 0
    ? (console.log(`[PDP] fuzzy matched "${e}" -> "${c}" (score ${l})`), Z[c])
    : we;
}
function Ee({ products: e }) {
  let { id: t } = re(),
    n = d(),
    [r, i] = (0, B.useState)(1),
    [a, o] = (0, B.useState)(!1),
    [s, c] = (0, B.useState)({ text: ``, isError: !1 }),
    [l, u] = (0, B.useState)(0),
    [f, p] = (0, B.useState)(!1),
    [m, h] = (0, B.useState)({ x: 50, y: 50 }),
    [g, _] = (0, B.useState)(!1),
    [v, y] = (0, B.useState)(1),
    b = (0, B.useRef)(null),
    x = (0, B.useRef)(!1),
    S = (0, B.useRef)({ x: 50, y: 50 }),
    C = (0, B.useRef)({
      active: !1,
      moved: !1,
      startX: 0,
      startY: 0,
      originX: 50,
      originY: 50,
    });
  ((0, B.useEffect)(() => {
    x.current = f;
  }, [f]),
    (0, B.useEffect)(() => {
      S.current = m;
    }, [m]));
  let [w, D] = (0, B.useState)(`overview`),
    [O, k] = (0, B.useState)({ reviews: [], count: 0, avg: 0, breakdown: {} }),
    [A, j] = (0, B.useState)(!1),
    [M, ee] = (0, B.useState)(!1),
    [P, F] = (0, B.useState)(0),
    [I, te] = (0, B.useState)(0),
    [ae, R] = (0, B.useState)(``),
    [z, oe] = (0, B.useState)(``),
    [se, ce] = (0, B.useState)(!1),
    [le, V] = (0, B.useState)(``),
    [de, fe] = (0, B.useState)(!1),
    [pe, me] = (0, B.useState)(!1),
    [U, W] = (0, B.useState)(`choose`),
    [ge, _e] = (0, B.useState)(!1),
    ve = (() => {
      try {
        return JSON.parse(localStorage.getItem(`user`) || `null`);
      } catch {
        return null;
      }
    })(),
    K = e?.find((e) => e._id === t),
    [selectedColor, setSelectedColor] = (0, B.useState)(``);
  (0, B.useEffect)(() => {
    if (K && K.variants && K.variants.length > 0) {
      let firstValid = K.variants.find((e) => e && e.trim() !== ``);
      firstValid ? setSelectedColor(firstValid) : setSelectedColor(``);
    } else {
      setSelectedColor(``);
    }
  }, [K]);
  (0, B.useEffect)(() => {
    t &&
      (j(!0),
      fetch(`${H}/reviews/${t}`)
        .then((e) => e.json())
        .then((e) => k(e))
        .catch(() => {})
        .finally(() => j(!1)));
  }, [t]);
  let ye = async (e) => {
      if ((e.preventDefault(), !P)) {
        V(`Please select a star rating.`);
        return;
      }
      if (!z.trim()) {
        V(`Please write a review.`);
        return;
      }
      (V(``), ce(!0));
      try {
        let e = await fetch(`${H}/reviews/${t}`, {
            method: `POST`,
            headers: {
              "Content-Type": `application/json`,
              Authorization: `Bearer ${localStorage.getItem(`token`)}`,
            },
            body: JSON.stringify({ rating: P, title: ae, body: z }),
          }),
          n = await e.json();
        if (!e.ok) {
          V(n.error || `Failed to submit review.`);
          return;
        }
        (fe(!0),
          ee(!1),
          F(0),
          R(``),
          oe(``),
          k(await fetch(`${H}/reviews/${t}`).then((e) => e.json())));
      } catch {
        V(`Network error. Please try again.`);
      } finally {
        ce(!1);
      }
    },
    q = K ? (K.images?.length > 0 ? K.images : [K.image].filter(Boolean)) : [],
    J = () => {
      K && r < K.stock
        ? i((e) => e + 1)
        : c({
            text: `⚠️ Only ${K?.stock} items available in stock.`,
            isError: !0,
          });
    },
    xe = () => {
      (c({ text: ``, isError: !1 }), i((e) => (e > 1 ? e - 1 : 1)));
    },
    Y = (e, t, n) => {
      let r = n.getBoundingClientRect();
      return {
        x: Math.min(100, Math.max(0, ((e - r.left) / r.width) * 100)),
        y: Math.min(100, Math.max(0, ((t - r.top) / r.height) * 100)),
      };
    },
    Se = (e) => {
      h(Y(e.clientX, e.clientY, e.currentTarget));
    },
    X = (e) => {
      if (!window.matchMedia(`(hover: hover) and (pointer: fine)`).matches) {
        if (C.current.moved) {
          C.current.moved = !1;
          return;
        }
        (h(Y(e.clientX, e.clientY, e.currentTarget)), p((e) => !e));
      }
    };
  (0, B.useEffect)(() => {
    let e = b.current;
    if (!e) return;
    let t = 1.75,
      n = (e) => {
        if (!x.current || e.target.closest(`button`)) return;
        let t = e.touches[0];
        ((C.current = {
          active: !0,
          moved: !1,
          startX: t.clientX,
          startY: t.clientY,
          originX: S.current.x,
          originY: S.current.y,
        }),
          e.preventDefault());
      },
      r = (n) => {
        if (!C.current.active) return;
        let r = n.touches[0],
          i = r.clientX - C.current.startX,
          a = r.clientY - C.current.startY;
        if (
          ((Math.abs(i) > 4 || Math.abs(a) > 4) && (C.current.moved = !0),
          !C.current.moved)
        )
          return;
        let o = e.getBoundingClientRect();
        (h({
          x: Math.min(
            100,
            Math.max(0, C.current.originX - (i / t / o.width) * 100),
          ),
          y: Math.min(
            100,
            Math.max(0, C.current.originY - (a / t / o.height) * 100),
          ),
        }),
          n.preventDefault());
      },
      i = () => {
        C.current.active = !1;
      };
    return (
      e.addEventListener(`touchstart`, n, { passive: !1 }),
      e.addEventListener(`touchmove`, r, { passive: !1 }),
      e.addEventListener(`touchend`, i),
      () => {
        (e.removeEventListener(`touchstart`, n),
          e.removeEventListener(`touchmove`, r),
          e.removeEventListener(`touchend`, i));
      }
    );
  }, []);
  let Z = async () => {
      if (!K || K.stock === 0) {
        c({ text: `❌ This product is currently out of stock.`, isError: !0 });
        return;
      }
      let e = localStorage.getItem(`token`);
      if (!e) {
        (he(K, r, selectedColor),
          c({
            text: `🛒 Added to cart! Login to checkout with saved addresses.`,
            isError: !1,
          }),
          setTimeout(() => n(`/cart`), 1200));
        return;
      }
      (o(!0), c({ text: ``, isError: !1 }));
      try {
        let t = await fetch(`${H}/cart/add`, {
            method: `POST`,
            headers: {
              "Content-Type": `application/json`,
              Authorization: `Bearer ${e}`,
            },
            body: JSON.stringify({
              productId: K._id,
              quantity: Number(r),
              variant: selectedColor || K.size || `Standard`
            }),
          }),
          i = await t.json();
        if (!t.ok)
          throw Error(i.error || i.message || `Failed to add to cart.`);
        (c({ text: `🛒 Added to cart!`, isError: !1 }),
          setTimeout(() => n(`/cart`), 1200));
      } catch (e) {
        c({ text: `❌ ${e.message}`, isError: !0 });
      } finally {
        o(!1);
      }
    },
    we = () => {
      if (!K || K.stock === 0) {
        c({ text: `❌ This product is currently out of stock.`, isError: !0 });
        return;
      }
      (W(localStorage.getItem(`token`) ? `loggedIn` : `choose`),
        window.scrollTo({ top: 0, behavior: `smooth` }),
        me(!0));
    },
    Ee = async (e, t, i) => {
      _e(!0);
      try {
        let a = K.discountPrice ?? K.price,
          o = [
            {
              productId: K._id,
              name: K.name,
              price: a,
              quantity: r,
              image: q[l] || q[0] || K.image || ``,
              variant: selectedColor || K.size || `Standard`,
            },
          ],
          s = await fetch(`${H}/checkout/create-order`, {
            method: `POST`,
            headers: {
              "Content-Type": `application/json`,
              Authorization: `Bearer ${e}`,
            },
            body: JSON.stringify({ items: o, guestDeliveryAddress: i }),
          }),
          c = await s.json();
        if (!s.ok) throw Error(c.error || `Failed to create payment order.`);
        let l = {
            key: c.keyId,
            amount: c.amount,
            currency: `INR`,
            name: `Padmini Vastra`,
            description: K.name,
            image: `/images/logo_cutout.png`,
            order_id: c.id,
            prefill: { name: t.name, contact: t.phone },
            theme: { color: `#1c1c1a` },
            handler: async (t) => {
              try {
                let r = await fetch(`${H}/checkout/verify-payment`, {
                    method: `POST`,
                    headers: {
                      "Content-Type": `application/json`,
                      Authorization: `Bearer ${e}`,
                    },
                    body: JSON.stringify({
                      razorpay_order_id: t.razorpay_order_id,
                      razorpay_payment_id: t.razorpay_payment_id,
                      razorpay_signature: t.razorpay_signature,
                      items: o,
                      guestDeliveryAddress: i,
                    }),
                  }),
                  a = await r.json();
                r.ok && a.success
                  ? (me(!1),
                    alert(`Payment successful! Your order has been placed.`),
                    n(`/`))
                  : alert(
                      `Payment verification failed. Please contact support.`,
                    );
              } catch (e) {
                (console.error(`Verify error:`, e),
                  alert(
                    `An error occurred during verification. Please contact support.`,
                  ));
              }
            },
          },
          u = new window.Razorpay(l);
        (u.on(`payment.failed`, (e) =>
          alert(`Payment failed: ${e.error.description}`),
        ),
          u.open());
      } catch (e) {
        alert(`Error: ${e.message}`);
      } finally {
        _e(!1);
      }
    };
  if (!e || e.length === 0)
    return (0, G.jsx)(`div`, {
      style: {
        padding: `100px 20px`,
        textAlign: `center`,
        fontFamily: `sans-serif`,
        color: `#666`,
      },
      children: (0, G.jsx)(`h3`, { children: `Loading Product Details...` }),
    });
  if (!K)
    return (0, G.jsxs)(`div`, {
      style: {
        padding: `100px 20px`,
        textAlign: `center`,
        fontFamily: `sans-serif`,
      },
      children: [
        (0, G.jsx)(`h3`, {
          style: { color: `#a61d24` },
          children: `Product Not Found`,
        }),
        (0, G.jsx)(`p`, {
          style: { color: `#666`, fontSize: `14px`, marginTop: `10px` },
          children: `The item you are looking for does not exist or has been removed.`,
        }),
        (0, G.jsx)(`button`, {
          onClick: () => n(`/products`),
          style: {
            marginTop: `20px`,
            padding: `10px 20px`,
            cursor: `pointer`,
            background: `#1c242c`,
            color: `#fff`,
            border: `none`,
          },
          children: `Go to Shop`,
        }),
      ],
    });
  let De = q[l] || q[0] || ``;
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
        .pdp-container {
          max-width: 1280px; margin: 0 auto; padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #222222;
        }
        .pdp-back-btn {
          background: none; border: none; font-size: 13px; color: #7c7c75;
          cursor: pointer; margin-bottom: 20px; display: flex; align-items: center;
          gap: 6px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500;
        }
        .pdp-main-layout {
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; align-items: start;
        }

        /* ── Image gallery ─────────────────────────────────── */
        .pdp-image-section {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 12px;
          align-items: start;
        }

        /* Vertical thumbnail column */
        .pdp-thumbs {
          display: flex; flex-direction: column; gap: 8px;
          max-height: 520px; overflow-y: auto;
          scrollbar-width: thin; scrollbar-color: #ddddd8 transparent;
        }
        .pdp-thumbs::-webkit-scrollbar { width: 4px; }
        .pdp-thumbs::-webkit-scrollbar-thumb { background: #ddddd8; border-radius: 2px; }

        .pdp-thumb {
          flex-shrink: 0; width: 72px; height: 72px; border-radius: 6px;
          overflow: hidden; cursor: pointer; border: 2px solid transparent;
          background: #f0ede8; transition: border-color 0.15s;
        }
        .pdp-thumb.active { border-color: #1c1c1a; }
        .pdp-thumb:hover:not(.active) { border-color: #aaa; }
        .pdp-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Main image + arrows */
        .pdp-main-image-wrap {
          position: relative; background: #fafaf7; overflow: hidden;
          border-radius: 8px; cursor: zoom-in;
        }
        .pdp-main-image-wrap.zoomed { cursor: zoom-out; }

        .pdp-main-image-wrap img {
          width: 100%; height: auto; display: block; object-fit: cover;
          transition: transform 0.15s ease;
          transform-origin: var(--zoom-x, 50%) var(--zoom-y, 50%);
        }

        /* Zoom toggle button — transparent glass look so it sits nicely over any image */
        .pdp-zoom-toggle-btn {
          position: absolute; top: 12px; right: 12px; z-index: 3;
          background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.35);
          border-radius: 50%; width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #1c1c1a; backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .pdp-zoom-toggle-btn:hover { background: rgba(255,255,255,0.4); transform: scale(1.08); }

        /* Zoom popup modal */
        .pdp-zoom-modal-overlay {
          position: fixed; inset: 0; z-index: 99999;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; overflow-y: auto;
        }
        .pdp-zoom-modal-box {
          position: relative; background: #fff; border-radius: 14px; overflow: hidden;
          width: 100%; max-width: 560px; max-height: 90vh;
          display: flex; flex-direction: column; margin: auto;
        }
        .pdp-zoom-modal-close {
          position: absolute; top: 12px; right: 12px; z-index: 3;
          background: rgba(0,0,0,0.45); border: none; color: #fff; cursor: pointer;
          border-radius: 50%; width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px);
        }
        .pdp-zoom-modal-img-wrap {
          width: 100%; aspect-ratio: 1 / 1; overflow: auto; background: #fafaf7;
          display: flex; align-items: center; justify-content: center;
          -webkit-overflow-scrolling: touch;
        }
        .pdp-zoom-modal-img-wrap img {
          max-width: 100%; max-height: 100%; object-fit: contain;
          transition: transform 0.2s ease; transform-origin: center center;
        }
        .pdp-zoom-modal-controls {
          display: flex; align-items: center; justify-content: center; gap: 16px;
          padding: 14px; border-top: 1px solid #f0f0ec;
        }
        .pdp-zoom-ctrl-btn {
          background: #1c1c1a; color: #fff; border: none; border-radius: 50%;
          width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s ease;
        }
        .pdp-zoom-ctrl-btn:hover:not(:disabled) { background: #3a3a36; }
        .pdp-zoom-ctrl-btn:disabled { background: #ddddd8; color: #9ca3af; cursor: not-allowed; }
        .pdp-zoom-level { font-size: 13px; font-weight: 600; color: #1c1c1a; min-width: 48px; text-align: center; }

        @media (max-width: 600px) {
          .pdp-zoom-modal-overlay { padding: 0; align-items: stretch; }
          .pdp-zoom-modal-box {
            max-width: 100%; width: 100%; height: 100vh; max-height: 100vh;
            border-radius: 0; margin: 0;
          }
          .pdp-zoom-modal-img-wrap { aspect-ratio: auto; flex: 1; min-height: 0; }
          .pdp-zoom-modal-close {
            top: max(12px, env(safe-area-inset-top)); right: 12px;
            width: 40px; height: 40px;
          }
          .pdp-zoom-modal-controls {
            padding: 14px 16px max(14px, env(safe-area-inset-bottom));
            gap: 22px;
          }
          .pdp-zoom-ctrl-btn { width: 46px; height: 46px; }
          .pdp-zoom-level { font-size: 14px; min-width: 54px; }
        }

        @media (max-width: 768px) {
          .pdp-zoom-toggle-btn { width: 42px; height: 42px; top: 10px; right: 10px; }
        }

        /* Arrow nav buttons */
        .pdp-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.85); border: 1px solid #ddddd8;
          border-radius: 50%; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 2; font-size: 16px; color: #1c1c1a;
          transition: background 0.15s; backdrop-filter: blur(4px);
        }
        .pdp-arrow:hover { background: #fff; }
        .pdp-arrow:disabled { opacity: 0.3; cursor: default; }
        .pdp-arrow-left  { left: 10px; }
        .pdp-arrow-right { right: 10px; }

        /* Image counter dot strip */
        .pdp-dots {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 5px; z-index: 2;
        }
        .pdp-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.5); border: 1px solid rgba(0,0,0,0.2);
          transition: background 0.15s;
        }
        .pdp-dot.active { background: #1c1c1a; border-color: #1c1c1a; }

        /* ── Details column ────────────────────────────────── */
        .pdp-details-section { padding-left: 10px; }
        .pdp-meta-tag {
        display: none; /* hidden by default, shown if details are available */
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;
          color: #ffffff; background: #1c1c1a; padding: 4px 10px;
          display: inline-block; margin-bottom: 12px; border-radius: 4px;
        }
        .pdp-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 500; line-height: 1.3;
          margin-bottom: 15px; color: #1c1c1a;
        }
        .pdp-specs { font-size: 14px; color: #3d3d3a; margin-bottom: 20px; line-height: 1.6; }
        .pdp-price-row {
          margin-bottom: 25px; display: flex; align-items: baseline; gap: 12px;
        }
        .pdp-mrp { color: #bcbcb8; text-decoration: line-through; font-size: 16px; }
        .pdp-current-price { font-size: 24px; font-weight: 600; color: #1c1c1a; }

        /* Action buttons */
        .pdp-actions-row { display: flex; gap: 12px; margin-bottom: 6px; }
        .pdp-quantity-selector {
          display: flex; align-items: center; border: 1px solid #ddddd8;
          border-radius: 4px; background: #ffffff;
        }
        .pdp-qty-btn {
          background: none; border: none; width: 36px; height: 44px;
          cursor: pointer; font-size: 16px; color: #3d3d3a;
        }
        .pdp-qty-value { width: 32px; text-align: center; font-size: 14px; font-weight: 500; color: #1c1c1a; }
        .pdp-add-cart-btn {
          flex: 1; background: #ffffff; border: 1px solid #1c1c1a; color: #1c1c1a;
          font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;
          border-radius: 4px; cursor: pointer; transition: background 0.2s;
        }
        .pdp-add-cart-btn:hover:not(:disabled) { background: #fafaf7; }
        .pdp-add-cart-btn:disabled { background: #ddddd8; color: #9ca3af; border-color: #ddddd8; cursor: not-allowed; }
        .pdp-api-feedback { font-size: 13px; margin: 12px 0; font-weight: 500; }
        .pdp-buynow-btn {
          width: 100%; background: #1c1c1a; color: white; border: none; padding: 15px;
          font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
          border-radius: 4px; cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 8px; margin-bottom: 35px; transition: background 0.2s;
        }
        .pdp-buynow-btn:hover:not(:disabled) { background: #3d3d3a; }

        /* Trust badges */
        .pdp-trust-badges {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;
          border-bottom: 1px solid #ebebeb; padding-bottom: 25px; margin-bottom: 25px;
        }
        .pdp-badge-item { text-align: center; font-size: 10px; color: #7c7c75; line-height: 1.4; }
        .pdp-badge-circle {
          width: 44px; height: 44px; border: 1px solid #ddddd8; border-radius: 50%;
          margin: 0 auto 8px; display: flex; align-items: center; justify-content: center;
          background: #fafaf7; font-size: 16px;
        }

        /* Checkout security strip */
        .pdp-checkout-security {
          border: 1px dashed #ddddd8; border-radius: 8px; padding: 14px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 10px; background: #fafaf7;
        }
        .pdp-security-title { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #7c7c75; letter-spacing: 0.05em; }
        .pdp-gateways-row { display: flex; align-items: center; gap: 6px; }
        .pdp-gateway-card {
          font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 4px;
          border: 1px solid #ddddd8; background: #ffffff; color: #3d3d3a; text-transform: uppercase;
        }

        /* Modal */
        .pdp-modal-overlay {
          position: fixed; inset: 0; background: rgba(28,28,26,0.4); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; z-index: 99999;
          animation: fadeIn 0.25s ease;
        }
        .pdp-modal-box {
          background: #ffffff; border-radius: 16px; position: relative;
          width: 100%; max-width: 440px; box-shadow: 0 24px 60px rgba(0,0,0,0.1);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pdp-modal-close {
          position: absolute; top: 20px; right: 20px; background: none; border: none;
          color: #bcbcb8; cursor: pointer; z-index: 10; transition: color 0.15s;
        }
        .pdp-modal-close:hover { color: #1c1c1a; }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* Responsive */
        @media (max-width: 768px) {
          .pdp-container { padding: 20px 16px; }
          .pdp-main-layout { grid-template-columns: 1fr; gap: 28px; }
          .pdp-trust-badges { grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .pdp-modal-box { max-width: 94%; }
          .pdp-title { font-size: 1.7rem; }
          .pdp-current-price { font-size: 20px; }
          /* On mobile: thumbnails move below the main image as a horizontal strip */
          .pdp-image-section {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }
          .pdp-thumbs {
            order: 2;
            flex-direction: row;
            max-height: none;
            overflow-x: auto;
            overflow-y: hidden;
            scrollbar-width: none;
          }
          .pdp-thumbs::-webkit-scrollbar { display: none; }
          .pdp-main-image-wrap { order: 1; }
          .pdp-thumb { width: 64px; height: 64px; }
          .pdp-arrow { width: 30px; height: 30px; font-size: 13px; }
        }
        @media (max-width: 480px) {
          .pdp-trust-badges { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .pdp-actions-row { flex-direction: column; gap: 10px; }
          .pdp-add-cart-btn { width: 100%; padding: 14px; }
          .pdp-quantity-selector { align-self: flex-start; }
        }

        /* ── Product Info Accordion ────────────────────────── */
        .pdp-accordion {
          max-width: 1280px; margin: 0 auto;
          padding: 0 20px 60px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        }
        .pdp-accordion-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 500; color: #1c1c1a;
          margin-bottom: 16px; letter-spacing: -0.01em;
        }
        .pdp-accordion-list { border-top: 1px solid #ebebeb; }

        .pdp-acc-item { border-bottom: 1px solid #ebebeb; }

        .pdp-acc-trigger {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 18px 4px; background: none; border: none; cursor: pointer;
          font-family: inherit; text-align: left;
        }
        .pdp-acc-trigger:hover .pdp-acc-label { color: #8b7355; }

        .pdp-acc-label {
          font-size: 13px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.07em; color: #1c1c1a; transition: color 0.15s;
        }
        .pdp-acc-icon {
          font-size: 20px; color: #aaa; transition: transform 0.25s ease;
          line-height: 1; flex-shrink: 0;
        }
        .pdp-acc-icon.open { transform: rotate(45deg); color: #1c1c1a; }

        .pdp-acc-body {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity  0.25s ease;
          opacity: 0;
        }
        .pdp-acc-body.open {
          max-height: 600px;
          opacity: 1;
        }
        .pdp-acc-content {
          padding: 0 4px 22px;
          font-size: 14px; line-height: 1.8; color: #555;
          white-space: pre-line;
        }
        @media (max-width: 768px) {
          .pdp-accordion { padding: 0 16px 48px; }
          .pdp-acc-label { font-size: 12px; }
          .pdp-acc-content { font-size: 13px; }
        }

        /* ── Reviews Section ───────────────────────────────────── */
        .pdp-reviews {
          max-width: 1280px; margin: 0 auto;
          padding: 0 20px 72px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          border-top: 1px solid #ebebeb;
        }
        .pdp-reviews-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          padding: 36px 0 28px; flex-wrap: wrap; gap: 16px;
        }
        .pdp-reviews-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 500; color: #1c1c1a; letter-spacing: -0.01em; margin: 0;
        }
        .pdp-write-btn {
          background: #1c1c1a; color: #fff; border: none; border-radius: 8px;
          padding: 10px 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; cursor: pointer; transition: background 0.2s;
        }
        .pdp-write-btn:hover { background: #3d3d3a; }
        .pdp-write-btn.outline {
          background: transparent; border: 1px solid #1c1c1a; color: #1c1c1a;
        }
        .pdp-write-btn.outline:hover { background: #f5f5f3; }

        .pdp-reviews-summary {
          display: flex; gap: 48px; align-items: flex-start;
          padding: 24px; background: #fafaf7; border-radius: 12px;
          border: 1px solid #ebebeb; margin-bottom: 32px; flex-wrap: wrap;
        }
        .pdp-avg-block { text-align: center; min-width: 100px; }
        .pdp-avg-number {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 3rem; font-weight: 400; line-height: 1; color: #1c1c1a; margin-bottom: 6px;
        }
        .pdp-avg-stars { display: flex; gap: 2px; justify-content: center; margin-bottom: 4px; }
        .pdp-avg-count { font-size: 11px; color: #888; }

        .pdp-breakdown { flex: 1; display: flex; flex-direction: column; gap: 7px; min-width: 160px; }
        .pdp-bar-row { display: flex; align-items: center; gap: 10px; }
        .pdp-bar-label { font-size: 12px; color: #555; min-width: 36px; }
        .pdp-bar-track { flex: 1; height: 6px; background: #e8e8e4; border-radius: 99px; overflow: hidden; }
        .pdp-bar-fill { height: 100%; background: #c9a96e; border-radius: 99px; transition: width 0.4s ease; }
        .pdp-bar-count { font-size: 11px; color: #888; min-width: 20px; text-align: right; }

        .pdp-review-list { display: flex; flex-direction: column; gap: 24px; }

        .pdp-review-card {
          padding: 22px 0; border-bottom: 1px solid #f0f0ed;
        }
        .pdp-review-card:last-child { border-bottom: none; }
        .pdp-review-top { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
        .pdp-reviewer-name { font-size: 13px; font-weight: 600; color: #1c1c1a; }
        .pdp-verified-badge {
          font-size: 10px; background: #ecfdf5; color: #166534; border-radius: 99px;
          padding: 2px 8px; font-weight: 500;
        }
        .pdp-review-date { font-size: 11px; color: #aaa; margin-left: auto; }
        .pdp-review-stars { display: flex; gap: 2px; margin-bottom: 6px; }
        .pdp-review-stars svg { width: 14px; height: 14px; }
        .pdp-review-title { font-size: 13px; font-weight: 600; color: #1c1c1a; margin-bottom: 6px; }
        .pdp-review-body { font-size: 14px; line-height: 1.7; color: #555; }

        .pdp-no-reviews { text-align: center; padding: 40px 20px; color: #aaa; font-size: 14px; }

        /* Review form */
        .pdp-review-form {
          background: #fafaf7; border: 1px solid #ebebeb; border-radius: 12px;
          padding: 28px; margin-bottom: 32px;
        }
        .pdp-review-form-title { font-size: 14px; font-weight: 600; color: #1c1c1a; margin-bottom: 20px; }
        .pdp-star-picker { display: flex; gap: 6px; margin-bottom: 18px; cursor: pointer; }
        .pdp-star-picker svg { width: 28px; height: 28px; transition: transform 0.1s; }
        .pdp-star-picker svg:hover { transform: scale(1.15); }
        .pdp-form-field { margin-bottom: 14px; }
        .pdp-form-field label { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #888; margin-bottom: 6px; }
        .pdp-form-field input, .pdp-form-field textarea {
          width: 100%; box-sizing: border-box; border: 1px solid #ddddd8; border-radius: 8px;
          padding: 10px 12px; font-size: 14px; font-family: inherit; color: #1c1c1a; background: #fff;
          outline: none; transition: border-color 0.2s; resize: vertical;
        }
        .pdp-form-field input:focus, .pdp-form-field textarea:focus { border-color: #8b7355; }
        .pdp-form-actions { display: flex; gap: 10px; margin-top: 18px; }
        .pdp-form-submit {
          background: #1c1c1a; color: #fff; border: none; border-radius: 8px;
          padding: 11px 24px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s;
        }
        .pdp-form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .pdp-form-submit:not(:disabled):hover { background: #3d3d3a; }
        .pdp-form-cancel {
          background: transparent; border: 1px solid #ddddd8; color: #555; border-radius: 8px;
          padding: 11px 20px; font-size: 13px; cursor: pointer;
        }
        .pdp-review-error { color: #a61d24; font-size: 12px; margin-top: 10px; }
        .pdp-review-success-msg {
          background: #ecfdf5; color: #166534; border: 1px solid #bbf7d0;
          border-radius: 8px; padding: 12px 16px; font-size: 13px; margin-bottom: 20px;
        }
        .pdp-login-to-review {
          background: #fafaf7; border: 1px dashed #ddddd8; border-radius: 10px;
          padding: 20px; text-align: center; font-size: 13px; color: #888; margin-bottom: 28px;
        }
        @media (max-width: 768px) {
          .pdp-reviews { padding: 0 16px 56px; }
          .pdp-reviews-summary { gap: 24px; }
          .pdp-avg-number { font-size: 2.4rem; }
        }
      `,
      }),
      (0, G.jsxs)(`div`, {
        className: `pdp-container`,
        children: [
          (0, G.jsxs)(`button`, {
            onClick: () => n(-1),
            className: `pdp-back-btn`,
            children: [(0, G.jsx)(ue, { size: 14 }), ` Back to Collection`],
          }),
          (0, G.jsxs)(`div`, {
            className: `pdp-main-layout`,
            children: [
              (0, G.jsxs)(`div`, {
                className: `pdp-image-section`,
                children: [
                  (0, G.jsx)(`div`, {
                    className: `pdp-thumbs`,
                    children: q.map((e, t) =>
                      (0, G.jsx)(
                        `div`,
                        {
                          className: `pdp-thumb${l === t ? ` active` : ``}`,
                          onClick: () => {
                            (u(t), p(!1));
                          },
                          children: (0, G.jsx)(`img`, {
                            src: e,
                            alt: `${K.name} view ${t + 1}`,
                            onError: (e) => {
                              e.target.src = `https://placehold.co/72x72?text=?`;
                            },
                          }),
                        },
                        t,
                      ),
                    ),
                  }),
                  (0, G.jsxs)(`div`, {
                    ref: b,
                    className: `pdp-main-image-wrap${f ? ` zoomed` : ``}`,
                    onMouseEnter: () => p(!0),
                    onMouseLeave: () => p(!1),
                    onMouseMove: Se,
                    onClick: X,
                    style: { "--zoom-x": `${m.x}%`, "--zoom-y": `${m.y}%` },
                    children: [
                      (0, G.jsx)(`img`, {
                        src: De,
                        alt: K.name,
                        style: { transform: f ? `scale(1.75)` : `scale(1)` },
                        onError: (e) => {
                          e.target.src = `https://placehold.co/600x600?text=No+Image`;
                        },
                      }),
                      (0, G.jsx)(`button`, {
                        className: `pdp-zoom-toggle-btn`,
                        onClick: (e) => {
                          (e.stopPropagation(), y(1), _(!0));
                        },
                        "aria-label": `Open image zoom`,
                        children: (0, G.jsx)(ie, { size: 18, strokeWidth: 2 }),
                      }),
                      q.length > 1 &&
                        (0, G.jsx)(`button`, {
                          className: `pdp-arrow pdp-arrow-left`,
                          onClick: (e) => {
                            (e.stopPropagation(),
                              u((e) => (e - 1 + q.length) % q.length),
                              p(!1));
                          },
                          "aria-label": `Previous image`,
                          children: `‹`,
                        }),
                      q.length > 1 &&
                        (0, G.jsx)(`button`, {
                          className: `pdp-arrow pdp-arrow-right`,
                          onClick: (e) => {
                            (e.stopPropagation(),
                              u((e) => (e + 1) % q.length),
                              p(!1));
                          },
                          "aria-label": `Next image`,
                          children: `›`,
                        }),
                      q.length > 1 &&
                        (0, G.jsx)(`div`, {
                          className: `pdp-dots`,
                          children: q.map((e, t) =>
                            (0, G.jsx)(
                              `div`,
                              {
                                className: `pdp-dot${l === t ? ` active` : ``}`,
                                onClick: (e) => {
                                  (e.stopPropagation(), u(t));
                                },
                              },
                              t,
                            ),
                          ),
                        }),
                    ],
                  }),
                ],
              }),
              (0, G.jsxs)(`div`, {
                className: `pdp-details-section`,
                children: [
                  (0, G.jsx)(`h1`, {
                    className: `pdp-title`,
                    children: K.name,
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `pdp-specs`,
                    children: [
                      (0, G.jsxs)(`div`, {
                        children: [
                          (0, G.jsx)(`strong`, { children: `Size:` }),
                          ` `,
                          K.size || `N/A`,
                        ],
                      }),
                      (0, G.jsxs)(`div`, {
                        children: [
                          (0, G.jsx)(`strong`, { children: `Availability:` }),
                          ` `,
                          K.stock > 0
                            ? (0, G.jsxs)(`span`, {
                                style: { color: `#166534`, fontWeight: `600` },
                                children: [`In Stock (`, K.stock, ` left)`],
                              })
                            : (0, G.jsx)(`span`, {
                                style: { color: `#a61d24`, fontWeight: `600` },
                                children: `Out of Stock`,
                              }),
                        ],
                      }),
                    ],
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `pdp-price-row`,
                    style: { display: `flex`, alignItems: `center`, gap: `12px` },
                    children: [
                      (0, G.jsxs)(`span`, {
                        className: `pdp-mrp`,
                        children: [`Rs. `, K.price?.toFixed(2)],
                      }),
                      (0, G.jsxs)(`span`, {
                        className: `pdp-current-price`,
                        children: [`now Rs. `, K.discountPrice?.toFixed(2)],
                      }),
                      K.discountPercent > 0 &&
                        (0, G.jsxs)(`span`, {
                          style: {
                            fontSize: `11px`,
                            fontWeight: `700`,
                            backgroundColor: `#ecfdf5`,
                            color: `#166534`,
                            padding: `3px 8px`,
                            borderRadius: `4px`,
                            textTransform: `uppercase`,
                          },
                          children: [`Save `, K.discountPercent, `%`],
                        }),
                    ],
                  }),
                  K.variants &&
                    K.variants.filter((e) => e && e.trim() !== ``).length > 0 &&
                    (0, G.jsxs)(`div`, {
                      className: `pdp-color-variants`,
                      style: { marginBottom: `20px` },
                      children: [
                        (0, G.jsx)(`span`, {
                          style: {
                            fontSize: `11px`,
                            fontWeight: `600`,
                            textTransform: `uppercase`,
                            letterSpacing: `0.06em`,
                            color: `#888`,
                            display: `block`,
                            marginBottom: `8px`,
                          },
                          children: `Select Colour:`,
                        }),
                        (0, G.jsx)(`div`, {
                          style: { display: `flex`, gap: `10px`, flexWrap: `wrap` },
                          children: K.variants.map((vName, idx) => {
                            if (!vName || vName.trim() === ``) return null;
                            let isSelected = selectedColor === vName;
                            return (0, G.jsx)(
                              `button`,
                              {
                                type: `button`,
                                onClick: () => {
                                  setSelectedColor(vName);
                                  u(idx);
                                },
                                style: {
                                  padding: `6px 12px`,
                                  fontSize: `12px`,
                                  fontWeight: `500`,
                                  border: isSelected
                                    ? `2px solid #1c1c1a`
                                    : `1px solid #ddddd8`,
                                  borderRadius: `4px`,
                                  background: isSelected
                                    ? `#fafaf7`
                                    : `#ffffff`,
                                  cursor: `pointer`,
                                  color: `#1c1c1a`,
                                  transition: `all 0.15s`,
                                },
                                children: vName,
                              },
                              idx,
                            );
                          }),
                        }),
                      ],
                    }),
                  (0, G.jsxs)(`div`, {
                    className: `pdp-actions-row`,
                    children: [
                      (0, G.jsxs)(`div`, {
                        className: `pdp-quantity-selector`,
                        children: [
                          (0, G.jsx)(`button`, {
                            type: `button`,
                            onClick: xe,
                            disabled: a || K.stock === 0,
                            className: `pdp-qty-btn`,
                            children: `−`,
                          }),
                          (0, G.jsx)(`div`, {
                            className: `pdp-qty-value`,
                            style: {
                              display: `flex`,
                              alignItems: `center`,
                              justifyContent: `center`,
                            },
                            children: K.stock === 0 ? 0 : r,
                          }),
                          (0, G.jsx)(`button`, {
                            type: `button`,
                            onClick: J,
                            disabled: a || K.stock === 0,
                            className: `pdp-qty-btn`,
                            children: `+`,
                          }),
                        ],
                      }),
                      (0, G.jsx)(`button`, {
                        type: `button`,
                        className: `pdp-add-cart-btn`,
                        onClick: Z,
                        disabled: a || K.stock === 0,
                        children: a
                          ? `Adding...`
                          : K.stock === 0
                            ? `Out of Stock`
                            : `Add to Cart`,
                      }),
                    ],
                  }),
                  s.text &&
                    (0, G.jsx)(`div`, {
                      className: `pdp-api-feedback`,
                      style: { color: s.isError ? `#a61d24` : `#166534` },
                      children: s.text,
                    }),
                  (0, G.jsxs)(`button`, {
                    type: `button`,
                    className: `pdp-buynow-btn`,
                    onClick: we,
                    disabled: a || ge || K.stock === 0,
                    style: {
                      opacity: K.stock === 0 ? 0.6 : 1,
                      cursor: K.stock === 0 ? `not-allowed` : `pointer`,
                    },
                    children: [
                      ge ? `Processing...` : `Buy Now`,
                      !ge &&
                        (0, G.jsx)(`span`, {
                          style: { fontSize: `10px`, opacity: 0.8 },
                          children: `⚡`,
                        }),
                    ],
                  }),
                  (0, G.jsx)(`div`, {
                    className: `pdp-trust-badges`,
                    children: [
                      { icon: `✨`, label: `No Color Fading` },
                      { icon: `🌱`, label: `100% Cotton` },
                      { icon: `🔄`, label: `Easy Returns` },
                      { icon: `💎`, label: `Premium Quality` },
                    ].map(({ icon: e, label: t }) =>
                      (0, G.jsxs)(
                        `div`,
                        {
                          className: `pdp-badge-item`,
                          children: [
                            (0, G.jsx)(`div`, {
                              className: `pdp-badge-circle`,
                              children: e,
                            }),
                            (0, G.jsx)(`div`, { children: t }),
                          ],
                        },
                        t,
                      ),
                    ),
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `pdp-checkout-security`,
                    children: [
                      (0, G.jsx)(`span`, {
                        className: `pdp-security-title`,
                        children: `Secured Checkout`,
                      }),
                      (0, G.jsxs)(`div`, {
                        className: `pdp-gateways-row`,
                        children: [
                          (0, G.jsx)(`span`, {
                            className: `pdp-gateway-card`,
                            style: { color: `#673ab7` },
                            children: `UPI`,
                          }),
                          (0, G.jsx)(`span`, {
                            className: `pdp-gateway-card`,
                            style: { color: `#00b9f5` },
                            children: `Paytm`,
                          }),
                          (0, G.jsx)(`span`, {
                            className: `pdp-gateway-card`,
                            style: { color: `#1a3a83` },
                            children: `Visa`,
                          }),
                          (0, G.jsx)(`span`, {
                            className: `pdp-gateway-card`,
                            children: `COD`,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (() => {
        let e = Te(K.name),
          t = {
            overview: K.overview?.trim() || e.overview,
            size: K.sizeFit?.trim() || e.size,
            material: K.material?.trim() || e.material,
            careGuide: K.careGuide?.trim() || e.careGuide,
            shippingRefund: K.shippingRefund?.trim() || e.shippingRefund,
          },
          n = [
            { key: `overview`, label: `Product Overview`, content: t.overview },
            { key: `size`, label: `Size & Fit`, content: t.size },
            { key: `material`, label: `Material`, content: t.material },
            { key: `careGuide`, label: `Care Guide`, content: t.careGuide },
            {
              key: `shippingRefund`,
              label: `Shipping & Refunds`,
              content: t.shippingRefund,
            },
          ];
        return (0, G.jsxs)(`div`, {
          className: `pdp-accordion`,
          children: [
            (0, G.jsx)(`div`, {
              className: `pdp-accordion-title`,
              children: `Product Information`,
            }),
            (0, G.jsx)(`div`, {
              className: `pdp-accordion-list`,
              children: n.map(({ key: e, label: t, content: n }) => {
                let r = w === e;
                return (0, G.jsxs)(
                  `div`,
                  {
                    className: `pdp-acc-item`,
                    children: [
                      (0, G.jsxs)(`button`, {
                        className: `pdp-acc-trigger`,
                        onClick: () => D(r ? null : e),
                        "aria-expanded": r,
                        children: [
                          (0, G.jsx)(`span`, {
                            className: `pdp-acc-label`,
                            children: t,
                          }),
                          (0, G.jsx)(`span`, {
                            className: `pdp-acc-icon${r ? ` open` : ``}`,
                            children: `+`,
                          }),
                        ],
                      }),
                      (0, G.jsx)(`div`, {
                        className: `pdp-acc-body${r ? ` open` : ``}`,
                        children: (0, G.jsx)(`div`, {
                          className: `pdp-acc-content`,
                          children: n,
                        }),
                      }),
                    ],
                  },
                  e,
                );
              }),
            }),
          ],
        });
      })(),
      (() => {
        let { reviews: e, count: t, avg: n, breakdown: r } = O,
          i = (e, t = 16) =>
            [1, 2, 3, 4, 5].map((n) =>
              (0, G.jsx)(
                `svg`,
                {
                  viewBox: `0 0 24 24`,
                  style: { width: t, height: t },
                  fill: n <= e ? `#c9a96e` : `none`,
                  stroke: n <= e ? `#c9a96e` : `#ddd`,
                  strokeWidth: `1.5`,
                  children: (0, G.jsx)(`path`, {
                    d: `M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z`,
                  }),
                },
                n,
              ),
            );
        return (0, G.jsxs)(`div`, {
          className: `pdp-reviews`,
          children: [
            (0, G.jsxs)(`div`, {
              className: `pdp-reviews-header`,
              children: [
                (0, G.jsxs)(`h2`, {
                  className: `pdp-reviews-title`,
                  children: [`Customer Reviews `, t > 0 && `(${t})`],
                }),
                ve &&
                  !de &&
                  (0, G.jsx)(`button`, {
                    className: `pdp-write-btn`,
                    onClick: () => ee((e) => !e),
                    children: M ? `Cancel` : `Write a Review`,
                  }),
              ],
            }),
            de &&
              (0, G.jsx)(`div`, {
                className: `pdp-review-success-msg`,
                children: `Thank you! Your review has been submitted.`,
              }),
            !ve &&
              (0, G.jsxs)(`div`, {
                className: `pdp-login-to-review`,
                children: [
                  (0, G.jsx)(`strong`, { children: `Purchased this product?` }),
                  ` Login to share your experience and help other shoppers.`,
                ],
              }),
            ve &&
              M &&
              (0, G.jsxs)(`form`, {
                className: `pdp-review-form`,
                onSubmit: ye,
                children: [
                  (0, G.jsx)(`div`, {
                    className: `pdp-review-form-title`,
                    children: `Rate this product`,
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `pdp-star-picker`,
                    children: [
                      [1, 2, 3, 4, 5].map((e) =>
                        (0, G.jsx)(
                          `svg`,
                          {
                            viewBox: `0 0 24 24`,
                            fill: (I || P) >= e ? `#c9a96e` : `none`,
                            stroke: (I || P) >= e ? `#c9a96e` : `#ccc`,
                            strokeWidth: `1.5`,
                            style: {
                              width: 28,
                              height: 28,
                              cursor: `pointer`,
                              transition: `transform 0.1s`,
                            },
                            onMouseEnter: () => te(e),
                            onMouseLeave: () => te(0),
                            onClick: () => F(e),
                            children: (0, G.jsx)(`path`, {
                              d: `M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z`,
                            }),
                          },
                          e,
                        ),
                      ),
                      P > 0 &&
                        (0, G.jsx)(`span`, {
                          style: {
                            marginLeft: 8,
                            fontSize: 13,
                            color: `#8b7355`,
                            alignSelf: `center`,
                          },
                          children: [
                            ``,
                            `Terrible`,
                            `Poor`,
                            `Okay`,
                            `Good`,
                            `Excellent`,
                          ][P],
                        }),
                    ],
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `pdp-form-field`,
                    children: [
                      (0, G.jsx)(`label`, {
                        children: `Review Title (optional)`,
                      }),
                      (0, G.jsx)(`input`, {
                        type: `text`,
                        placeholder: `Summarise your experience`,
                        value: ae,
                        onChange: (e) => R(e.target.value),
                        maxLength: 120,
                      }),
                    ],
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `pdp-form-field`,
                    children: [
                      (0, G.jsx)(`label`, { children: `Your Review *` }),
                      (0, G.jsx)(`textarea`, {
                        rows: 4,
                        placeholder: `What did you like or dislike? How was the quality, fit, delivery?`,
                        value: z,
                        onChange: (e) => oe(e.target.value),
                        maxLength: 1200,
                        required: !0,
                      }),
                    ],
                  }),
                  le &&
                    (0, G.jsx)(`div`, {
                      className: `pdp-review-error`,
                      children: le,
                    }),
                  (0, G.jsxs)(`div`, {
                    className: `pdp-form-actions`,
                    children: [
                      (0, G.jsx)(`button`, {
                        type: `submit`,
                        className: `pdp-form-submit`,
                        disabled: se,
                        children: se ? `Submitting…` : `Submit Review`,
                      }),
                      (0, G.jsx)(`button`, {
                        type: `button`,
                        className: `pdp-form-cancel`,
                        onClick: () => {
                          (ee(!1), V(``));
                        },
                        children: `Cancel`,
                      }),
                    ],
                  }),
                ],
              }),
            t > 0 &&
              (0, G.jsxs)(`div`, {
                className: `pdp-reviews-summary`,
                children: [
                  (0, G.jsxs)(`div`, {
                    className: `pdp-avg-block`,
                    children: [
                      (0, G.jsx)(`div`, {
                        className: `pdp-avg-number`,
                        children: n.toFixed(1),
                      }),
                      (0, G.jsx)(`div`, {
                        className: `pdp-avg-stars`,
                        children: i(Math.round(n), 16),
                      }),
                      (0, G.jsxs)(`div`, {
                        className: `pdp-avg-count`,
                        children: [t, ` `, t === 1 ? `review` : `reviews`],
                      }),
                    ],
                  }),
                  (0, G.jsx)(`div`, {
                    className: `pdp-breakdown`,
                    children: [5, 4, 3, 2, 1].map((e) =>
                      (0, G.jsxs)(
                        `div`,
                        {
                          className: `pdp-bar-row`,
                          children: [
                            (0, G.jsxs)(`div`, {
                              className: `pdp-bar-label`,
                              children: [e, ` ★`],
                            }),
                            (0, G.jsx)(`div`, {
                              className: `pdp-bar-track`,
                              children: (0, G.jsx)(`div`, {
                                className: `pdp-bar-fill`,
                                style: {
                                  width: `${t ? ((r[e] || 0) / t) * 100 : 0}%`,
                                },
                              }),
                            }),
                            (0, G.jsx)(`div`, {
                              className: `pdp-bar-count`,
                              children: r[e] || 0,
                            }),
                          ],
                        },
                        e,
                      ),
                    ),
                  }),
                ],
              }),
            A
              ? (0, G.jsx)(`div`, {
                  className: `pdp-no-reviews`,
                  children: `Loading reviews…`,
                })
              : t === 0
                ? (0, G.jsx)(`div`, {
                    className: `pdp-no-reviews`,
                    children: `No reviews yet. Be the first to share your experience!`,
                  })
                : (0, G.jsx)(`div`, {
                    className: `pdp-review-list`,
                    children: e.map((e) =>
                      (0, G.jsxs)(
                        `div`,
                        {
                          className: `pdp-review-card`,
                          children: [
                            (0, G.jsxs)(`div`, {
                              className: `pdp-review-top`,
                              children: [
                                (0, G.jsx)(`span`, {
                                  className: `pdp-reviewer-name`,
                                  children: e.userName,
                                }),
                                e.verified &&
                                  (0, G.jsx)(`span`, {
                                    className: `pdp-verified-badge`,
                                    children: `✓ Verified Purchase`,
                                  }),
                                (0, G.jsx)(`span`, {
                                  className: `pdp-review-date`,
                                  children: new Date(
                                    e.createdAt,
                                  ).toLocaleDateString(`en-IN`, {
                                    day: `numeric`,
                                    month: `short`,
                                    year: `numeric`,
                                  }),
                                }),
                              ],
                            }),
                            (0, G.jsx)(`div`, {
                              className: `pdp-review-stars`,
                              children: i(e.rating, 14),
                            }),
                            e.title &&
                              (0, G.jsx)(`div`, {
                                className: `pdp-review-title`,
                                children: e.title,
                              }),
                            (0, G.jsx)(`div`, {
                              className: `pdp-review-body`,
                              children: e.body,
                            }),
                          ],
                        },
                        e._id,
                      ),
                    ),
                  }),
          ],
        });
      })(),
      pe &&
        (0, G.jsx)(`div`, {
          className: `pdp-modal-overlay`,
          onClick: () => {
            (me(!1), W(`choose`));
          },
          style: { alignItems: `flex-start`, paddingTop: `40px` },
          children: (0, G.jsxs)(`div`, {
            className: `pdp-modal-box`,
            onClick: (e) => e.stopPropagation(),
            style: {
              maxWidth: U === `guest` ? `560px` : `440px`,
              borderRadius: `16px`,
              overflow: `hidden`,
            },
            children: [
              (0, G.jsxs)(`div`, {
                style: {
                  background: `#1c1c1a`,
                  padding: `14px 20px`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                },
                children: [
                  (0, G.jsxs)(`div`, {
                    children: [
                      (0, G.jsx)(`div`, {
                        style: {
                          color: `#fff`,
                          fontWeight: `700`,
                          fontSize: `13px`,
                          letterSpacing: `0.04em`,
                        },
                        children:
                          U === `choose`
                            ? `Complete Your Purchase`
                            : U === `login`
                              ? `Login to Continue`
                              : U === `guest`
                                ? `Guest Checkout`
                                : `Quick Checkout`,
                      }),
                      (0, G.jsxs)(`div`, {
                        style: {
                          color: `rgba(255,255,255,0.55)`,
                          fontSize: `11px`,
                          marginTop: `2px`,
                        },
                        children: [
                          K.name.length > 40
                            ? K.name.slice(0, 40) + `…`
                            : K.name,
                          ` · `,
                          `Qty `,
                          r,
                          ` · `,
                          `Rs. `,
                          ((K.discountPrice ?? K.price) * r).toLocaleString(
                            `en-IN`,
                          ),
                        ],
                      }),
                    ],
                  }),
                  (0, G.jsx)(`button`, {
                    type: `button`,
                    onClick: () => {
                      (me(!1), W(`choose`));
                    },
                    style: {
                      background: `rgba(255,255,255,0.1)`,
                      border: `none`,
                      color: `#fff`,
                      cursor: `pointer`,
                      borderRadius: `50%`,
                      width: `30px`,
                      height: `30px`,
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `center`,
                    },
                    children: (0, G.jsx)(N, { size: 15 }),
                  }),
                ],
              }),
              (0, G.jsxs)(`div`, {
                style: {
                  padding: `24px 24px 28px`,
                  maxHeight: `80vh`,
                  overflowY: `auto`,
                },
                children: [
                  U === `choose` &&
                    (0, G.jsxs)(`div`, {
                      style: {
                        display: `flex`,
                        flexDirection: `column`,
                        gap: `12px`,
                      },
                      children: [
                        (0, G.jsx)(`p`, {
                          style: {
                            margin: `0 0 16px`,
                            fontSize: `13px`,
                            color: `#888`,
                            textAlign: `center`,
                          },
                          children: `How would you like to complete this purchase?`,
                        }),
                        (0, G.jsxs)(`button`, {
                          onClick: () => W(`guest`),
                          style: {
                            display: `flex`,
                            alignItems: `center`,
                            gap: `16px`,
                            padding: `18px 20px`,
                            border: `2px solid #1c1c1a`,
                            borderRadius: `12px`,
                            background: `#1c1c1a`,
                            color: `#fff`,
                            cursor: `pointer`,
                            textAlign: `left`,
                            fontFamily: `inherit`,
                            width: `100%`,
                          },
                          children: [
                            (0, G.jsx)(`div`, {
                              style: {
                                width: `44px`,
                                height: `44px`,
                                borderRadius: `50%`,
                                background: `rgba(255,255,255,0.12)`,
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`,
                                flexShrink: 0,
                              },
                              children: (0, G.jsx)(T, { size: 20 }),
                            }),
                            (0, G.jsxs)(`div`, {
                              children: [
                                (0, G.jsx)(`div`, {
                                  style: {
                                    fontWeight: `700`,
                                    fontSize: `15px`,
                                    marginBottom: `3px`,
                                  },
                                  children: `Continue as Guest`,
                                }),
                                (0, G.jsx)(`div`, {
                                  style: { fontSize: `12px`, opacity: 0.65 },
                                  children: `Verify mobile with OTP — no account needed`,
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, G.jsxs)(`button`, {
                          onClick: () => W(`login`),
                          style: {
                            display: `flex`,
                            alignItems: `center`,
                            gap: `16px`,
                            padding: `18px 20px`,
                            border: `2px solid #e8e8e8`,
                            borderRadius: `12px`,
                            background: `#fff`,
                            color: `#1c1c1a`,
                            cursor: `pointer`,
                            textAlign: `left`,
                            fontFamily: `inherit`,
                            width: `100%`,
                          },
                          children: [
                            (0, G.jsx)(`div`, {
                              style: {
                                width: `44px`,
                                height: `44px`,
                                borderRadius: `50%`,
                                background: `#f5f5f5`,
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`,
                                flexShrink: 0,
                              },
                              children: (0, G.jsx)(E, { size: 20 }),
                            }),
                            (0, G.jsxs)(`div`, {
                              children: [
                                (0, G.jsx)(`div`, {
                                  style: {
                                    fontWeight: `700`,
                                    fontSize: `15px`,
                                    marginBottom: `3px`,
                                  },
                                  children: `Login / Register`,
                                }),
                                (0, G.jsx)(`div`, {
                                  style: { fontSize: `12px`, color: `#888` },
                                  children: `Saved addresses · Order history · Faster checkout`,
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, G.jsxs)(`div`, {
                          style: {
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `center`,
                            gap: `6px`,
                            marginTop: `8px`,
                            fontSize: `11px`,
                            color: `#aaa`,
                          },
                          children: [
                            (0, G.jsx)(ne, { size: 13 }),
                            ` Secure · Encrypted · 100% Safe`,
                          ],
                        }),
                      ],
                    }),
                  U === `login` &&
                    (0, G.jsxs)(`div`, {
                      children: [
                        (0, G.jsx)(`button`, {
                          onClick: () => W(`choose`),
                          style: {
                            background: `none`,
                            border: `none`,
                            cursor: `pointer`,
                            color: `#888`,
                            fontSize: `12px`,
                            padding: `0 0 14px`,
                            display: `flex`,
                            alignItems: `center`,
                            gap: `4px`,
                            fontFamily: `inherit`,
                          },
                          children: `← Back`,
                        }),
                        (0, G.jsx)(be, {
                          onSuccess: () => {
                            (me(!1),
                              W(`choose`),
                              c({
                                text: `🔓 Logged in! Adding to cart...`,
                                isError: !1,
                              }),
                              setTimeout(Z, 400));
                          },
                        }),
                      ],
                    }),
                  U === `guest` &&
                    (0, G.jsxs)(`div`, {
                      children: [
                        (0, G.jsx)(`button`, {
                          onClick: () => W(`choose`),
                          style: {
                            background: `none`,
                            border: `none`,
                            cursor: `pointer`,
                            color: `#888`,
                            fontSize: `12px`,
                            padding: `0 0 20px`,
                            display: `flex`,
                            alignItems: `center`,
                            gap: `4px`,
                            fontFamily: `inherit`,
                          },
                          children: `← Back`,
                        }),
                        (0, G.jsx)(Ce, {
                          onComplete: (e, t, n) => Ee(e, t, n),
                          onSwitchToLogin: () => W(`login`),
                        }),
                      ],
                    }),
                  U === `loggedIn` &&
                    (0, G.jsxs)(`div`, {
                      style: {
                        display: `flex`,
                        flexDirection: `column`,
                        gap: `16px`,
                      },
                      children: [
                        (0, G.jsxs)(`div`, {
                          style: {
                            display: `flex`,
                            gap: `14px`,
                            alignItems: `center`,
                            padding: `14px`,
                            background: `#fafaf7`,
                            borderRadius: `10px`,
                            border: `1px solid #ebebeb`,
                          },
                          children: [
                            (0, G.jsx)(`img`, {
                              src: De,
                              alt: K.name,
                              style: {
                                width: `60px`,
                                height: `60px`,
                                objectFit: `cover`,
                                borderRadius: `8px`,
                                flexShrink: 0,
                              },
                              onError: (e) => {
                                e.target.src = `https://placehold.co/60x60?text=?`;
                              },
                            }),
                            (0, G.jsxs)(`div`, {
                              style: { flex: 1, minWidth: 0 },
                              children: [
                                (0, G.jsx)(`div`, {
                                  style: {
                                    fontWeight: `600`,
                                    fontSize: `14px`,
                                    color: `#1c1c1a`,
                                    marginBottom: `3px`,
                                    overflow: `hidden`,
                                    textOverflow: `ellipsis`,
                                    whiteSpace: `nowrap`,
                                  },
                                  children: K.name,
                                }),
                                K.size &&
                                  (0, G.jsxs)(`div`, {
                                    style: { fontSize: `12px`, color: `#888` },
                                    children: [`Size: `, K.size],
                                  }),
                                (0, G.jsxs)(`div`, {
                                  style: {
                                    fontSize: `13px`,
                                    fontWeight: `600`,
                                    color: `#702c3a`,
                                    marginTop: `4px`,
                                  },
                                  children: [
                                    `Rs. `,
                                    (
                                      (K.discountPrice ?? K.price) * r
                                    ).toLocaleString(`en-IN`, {
                                      minimumFractionDigits: 2,
                                    }),
                                    (0, G.jsxs)(`span`, {
                                      style: {
                                        fontWeight: `400`,
                                        color: `#aaa`,
                                        marginLeft: `6px`,
                                        fontSize: `11px`,
                                      },
                                      children: [`× `, r],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        ve &&
                          (0, G.jsxs)(`div`, {
                            style: {
                              fontSize: `13px`,
                              color: `#555`,
                              display: `flex`,
                              alignItems: `center`,
                              gap: `8px`,
                            },
                            children: [
                              (0, G.jsx)(E, {
                                size: 14,
                                style: { color: `#8b7355`, flexShrink: 0 },
                              }),
                              `Logged in as `,
                              (0, G.jsx)(`strong`, { children: ve.name }),
                            ],
                          }),
                        (0, G.jsxs)(`button`, {
                          onClick: () => {
                            (me(!1),
                              c({ text: `🛒 Adding to cart...`, isError: !1 }),
                              Z());
                          },
                          style: {
                            width: `100%`,
                            padding: `15px`,
                            background: `#1c1c1a`,
                            color: `#fff`,
                            border: `none`,
                            borderRadius: `10px`,
                            fontSize: `14px`,
                            fontWeight: `700`,
                            cursor: `pointer`,
                            fontFamily: `inherit`,
                            letterSpacing: `0.04em`,
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `center`,
                            gap: `8px`,
                          },
                          children: [
                            (0, G.jsx)(ne, { size: 16 }),
                            ` Proceed to Checkout`,
                          ],
                        }),
                        (0, G.jsxs)(`div`, {
                          style: {
                            textAlign: `center`,
                            fontSize: `12px`,
                            color: `#aaa`,
                          },
                          children: [
                            `Not you?`,
                            ` `,
                            (0, G.jsx)(`button`, {
                              onClick: () => {
                                (localStorage.removeItem(`token`),
                                  localStorage.removeItem(`user`),
                                  W(`choose`));
                              },
                              style: {
                                background: `none`,
                                border: `none`,
                                color: `#8b7355`,
                                cursor: `pointer`,
                                fontSize: `12px`,
                                fontFamily: `inherit`,
                                textDecoration: `underline`,
                              },
                              children: `Checkout as Guest instead`,
                            }),
                          ],
                        }),
                      ],
                    }),
                ],
              }),
            ],
          }),
        }),
      g &&
        (0, G.jsx)(`div`, {
          className: `pdp-zoom-modal-overlay`,
          onClick: () => _(!1),
          children: (0, G.jsxs)(`div`, {
            className: `pdp-zoom-modal-box`,
            onClick: (e) => e.stopPropagation(),
            children: [
              (0, G.jsx)(`button`, {
                className: `pdp-zoom-modal-close`,
                onClick: () => _(!1),
                "aria-label": `Close zoom view`,
                children: (0, G.jsx)(N, { size: 20 }),
              }),
              (0, G.jsx)(`div`, {
                className: `pdp-zoom-modal-img-wrap`,
                children: (0, G.jsx)(`img`, {
                  src: De,
                  alt: K.name,
                  style: { transform: `scale(${v})` },
                  onError: (e) => {
                    e.target.src = `https://placehold.co/600x600?text=No+Image`;
                  },
                }),
              }),
              (0, G.jsxs)(`div`, {
                className: `pdp-zoom-modal-controls`,
                children: [
                  (0, G.jsx)(`button`, {
                    className: `pdp-zoom-ctrl-btn`,
                    onClick: () => y((e) => Math.max(1, +(e - 0.5).toFixed(2))),
                    disabled: v <= 1,
                    "aria-label": `Zoom out`,
                    children: (0, G.jsx)(L, { size: 18, strokeWidth: 2 }),
                  }),
                  (0, G.jsxs)(`span`, {
                    className: `pdp-zoom-level`,
                    children: [Math.round(v * 100), `%`],
                  }),
                  (0, G.jsx)(`button`, {
                    className: `pdp-zoom-ctrl-btn`,
                    onClick: () => y((e) => Math.min(3, +(e + 0.5).toFixed(2))),
                    disabled: v >= 3,
                    "aria-label": `Zoom in`,
                    children: (0, G.jsx)(ie, { size: 18, strokeWidth: 2 }),
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
var De = [
  `Free Delivery Across India`,
  `Cash on Delivery Available`,
  `Easy Returns`,
  `100% Premium Pure Cotton`,
  `Gift Wrapping Available on Request`,
];
function Oe() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

        .ann-bar {
          background: rgb(128, 0, 0);
          color: #fff;
          height: 46px;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          user-select: none;
        }

        .ann-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: ann-scroll 38s linear infinite;
          will-change: transform;
        }
        .ann-track:hover {
          animation-play-state: paused;
        }

        @keyframes ann-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ann-segment {
          display: inline-flex;
          align-items: center;
          font-size: 17px;
          font-weight: 500;
          font-style: italic;
          letter-spacing: 0.04em;
          font-family: 'Cormorant Garamond', 'Cormorant', 'Garamond', Georgia, serif;
          color: #fff;
        }

        .ann-sep {
          color: rgba(255, 255, 255, 0.55);
          margin: 0 20px;
          font-size: 13px;
          font-style: normal;
        }

        /* Fade edges */
        .ann-bar::before,
        .ann-bar::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          z-index: 2;
          pointer-events: none;
        }
        .ann-bar::before {
          left: 0;
          background: linear-gradient(to right, rgb(128,0,0), transparent);
        }
        .ann-bar::after {
          right: 0;
          background: linear-gradient(to left, rgb(128,0,0), transparent);
        }

        @media (max-width: 600px) {
          .ann-bar { height: 40px; }
          .ann-segment { font-size: 15px; }
          .ann-track { animation-duration: 28s; }
          .ann-bar::before, .ann-bar::after { width: 30px; }
        }
      `,
      }),
      (0, G.jsx)(`div`, {
        className: `ann-bar`,
        children: (0, G.jsx)(`div`, {
          className: `ann-track`,
          children: [0, 1].map((e) =>
            (0, G.jsx)(
              `span`,
              {
                style: { display: `inline-flex`, alignItems: `center` },
                children: De.map((e, t) =>
                  (0, G.jsxs)(
                    `span`,
                    {
                      style: { display: `inline-flex`, alignItems: `center` },
                      children: [
                        (0, G.jsx)(`span`, {
                          className: `ann-segment`,
                          children: e,
                        }),
                        (0, G.jsx)(`span`, {
                          className: `ann-sep`,
                          children: `✿`,
                        }),
                      ],
                    },
                    t,
                  ),
                ),
              },
              e,
            ),
          ),
        }),
      }),
    ],
  });
}
function ke() {
  let { pathname: e } = s(),
    t = (0, B.useRef)(e);
  return (
    (0, B.useEffect)(() => {
      t.current !== e &&
        (window.scrollTo({ top: 0, left: 0, behavior: `instant` }),
        (t.current = e));
    }, [e]),
    null
  );
}
function Ae() {
  let e = d(),
    [t, n] = (0, B.useState)(!1),
    [r, i] = (0, B.useState)(null),
    [a, o] = (0, B.useState)(!1),
    [s, c] = (0, B.useState)(null),
    [l, u] = (0, B.useState)(!1),
    [f, m] = (0, B.useState)(``),
    [h, _] = (0, B.useState)(0);
  ((0, B.useEffect)(() => {
    let e = localStorage.getItem(`user`);
    if (e)
      try {
        i(JSON.parse(e));
      } catch {}
  }, [t]),
    (0, B.useEffect)(() => {
      let e = () => {
        _(localStorage.getItem(`token`) ? 0 : me());
      };
      return (
        e(),
        window.addEventListener(`guestCartUpdated`, e),
        window.addEventListener(`storage`, e),
        () => {
          (window.removeEventListener(`guestCartUpdated`, e),
            window.removeEventListener(`storage`, e));
        }
      );
    }, [r]),
    (0, B.useEffect)(
      () => (
        (document.body.style.overflow = a ? `hidden` : ``),
        () => {
          document.body.style.overflow = ``;
        }
      ),
      [a],
    ));
  let v = () => {
      (o(!1), c(null));
    },
    y = () => {
      (m(``), window.scrollTo({ top: 0, behavior: `instant` }), u(!0));
    };
  (0, B.useEffect)(() => {
    let e = (e) => {
      e.key === `Escape` && u(!1);
    };
    return (
      l && document.addEventListener(`keydown`, e),
      () => document.removeEventListener(`keydown`, e)
    );
  }, [l]);
  let b = (t) => {
      t.preventDefault();
      let n = f.trim();
      n && (u(!1), m(``), e(`/products?q=${encodeURIComponent(n)}`));
    },
    S = () => {
      (localStorage.removeItem(`token`),
        localStorage.removeItem(`user`),
        i(null),
        e(`/`),
        v());
    },
    C = [
      { name: `New Arrivals`, path: `/new-arrivals` },
      { name: `Best Sellers`, path: `/products/best-sellers` },
      { name: `Kalyani Cotton`, path: `/products/kalyani-cotton-saree` },
      { name: `Khadi Embroidery`, path: `/products/khadi-embroidery-saree` },
      { name: `Mul Cotton`, path: `/products/mul-cotton-saree` },
      { name: `Gini Tissue`, path: `/products/gini-tissue-saree` },
      { name: `Plain Soft Silk`, path: `/products/plain-soft-silk-saree` },
      {
        name: `Borderless Silk`,
        path: `/products/border-less-soft-silk-saree`,
      },
      { name: `Champion Silk`, path: `/products/champion-silk-saree` },
      { name: `Soft Silk`, path: `/products/soft-silk-saree` },
      { name: `Ds Kottanchi`, path: `/products/ds-kottanchi-saree` },
    ];
  return (0, G.jsxs)(`div`, {
    style: { width: `100%` },
    children: [
      (0, G.jsx)(`style`, {
        children: `
        /* ── DESKTOP PROFILE DROPDOWN ─────────────────────────── */
        .profile-dropdown-wrapper { position: relative; display: inline-block; }
        .profile-trigger-btn {
          background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #222;
          display: flex; align-items: center; gap: 6px; padding: 4px 0;
        }
        .profile-dropdown-menu {
          position: absolute; top: 100%; right: 0; background: #fff;
          border: 1px solid #ebebeb; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          padding: 8px 0; min-width: 140px; z-index: 99999; display: none;
        }
        .profile-dropdown-wrapper:hover .profile-dropdown-menu { display: block; }
        .profile-dropdown-item {
          display: block; width: 100%; text-align: left; background: none; border: none;
          padding: 10px 16px; font-size: 12px; color: #333; cursor: pointer;
          text-decoration: none; font-family: 'DM Sans', sans-serif;
          box-sizing: border-box; transition: background 0.15s;
        }
        .profile-dropdown-item:hover { background: #fafaf7; color: #8b7355; }

        /* ── DESKTOP NAV MEGA DROPDOWN ────────────────────────── */
        .nav-item-wrapper { position: relative; display: inline-block; }
        .mega-dropdown-menu {
          position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
          background: #fff; border: 1px solid #ebebeb; box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          padding: 20px; min-width: 280px; z-index: 1500; display: none;
          gap: 24px; border-radius: 4px; text-align: left;
        }
        .nav-item-wrapper:hover .mega-dropdown-menu { display: flex; }
        .dropdown-column { min-width: 130px; }
        .dropdown-heading {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          text-transform: uppercase; color: #222; margin-bottom: 8px;
          display: block; text-decoration: none;
        }
        .dropdown-heading:hover { color: #8b7355; }
        .dropdown-list { list-style: none; padding: 0; margin: 0; }
        .dropdown-link {
          display: block; font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: #666; text-decoration: none; padding: 4px 0; transition: color 0.15s;
        }
        .dropdown-link:hover { color: #8b7355; padding-left: 2px; }

        /* ── HAMBURGER BUTTON ─────────────────────────────────── */
        .hamburger-btn {
          display: none; background: none; border: none; cursor: pointer;
          padding: 4px; color: #222; align-items: center; justify-content: center;
        }

        /* ── MOBILE DRAWER BACKDROP ───────────────────────────── */
        .mobile-nav-backdrop {
          display: none; position: fixed; inset: 0;
          background: rgba(0,0,0,0.45); z-index: 19997;
          animation: backdropIn 0.25s ease;
        }
        .mobile-nav-backdrop.open { display: block; }
        @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }

        /* ── MOBILE DRAWER — slides from the LEFT ───────────── */
        .mobile-nav-drawer {
          position: fixed; top: 0; left: 0; width: 82%; max-width: 310px;
          height: 100vh; height: 100dvh; background: #fff; z-index: 19998;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow-y: auto; display: flex; flex-direction: column;
          box-shadow: 4px 0 30px rgba(0,0,0,0.15);
        }
        .mobile-nav-drawer.open { transform: translateX(0); }

        .mobile-drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px; border-bottom: 1px solid #f0f0f0; flex-shrink: 0;
        }
        .mobile-drawer-logo { height: 30px; width: auto; object-fit: contain; }
        .mobile-drawer-close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #555;
          display: flex; align-items: center; border-radius: 4px;
        }

        .mobile-nav-list { list-style: none; padding: 0; margin: 0; flex: 1; overflow-y: auto; }
        .mobile-nav-item  { border-bottom: 1px solid #f5f5f5; }
        .mobile-nav-btn {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
          padding: 16px 18px; background: none; border: none; cursor: pointer;
          font-size: 15px; font-weight: 600; color: #1c1c1a;
          text-transform: uppercase; letter-spacing: 0.07em; font-family: inherit;
          text-decoration: none;
        }
        .mobile-nav-btn svg { transition: transform 0.2s ease; flex-shrink: 0; }
        .mobile-nav-btn.expanded svg.chevron { transform: rotate(180deg); }

        .mobile-sub-panel { background: #fafaf7; overflow: hidden; }
        .mobile-sub-all {
          display: block; padding: 10px 18px 6px 28px;
          font-size: 11px; font-weight: 700; color: #8b7355;
          text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none;
        }
        .mobile-sub-group-label {
          display: block; padding: 10px 18px 4px 28px;
          font-size: 11px; font-weight: 700; color: #5a3609;
          text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none;
        }
        .mobile-sub-group-label:hover { color: #8b7355; }
        .mobile-sub-link {
          display: block; padding: 10px 18px 10px 40px;
          font-size: 14px; color: #555; text-decoration: none; transition: color 0.15s;
        }
        .mobile-sub-link:hover { color: #1c1c1a; }

        .mobile-drawer-foot {
          padding: 16px 18px calc(40px + env(safe-area-inset-bottom, 0px)) 18px;
          margin-bottom: 16px;
          border-top: 1px solid #f0f0f0;
          display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
          background: #fff;
          position: sticky; bottom: 0;
        }
        .mobile-foot-btn {
          display: flex; align-items: center; gap: 10px; padding: 13px 14px;
          border: 1px solid #e8e8e8; border-radius: 8px; background: none;
          cursor: pointer; font-size: 15px; font-weight: 600; color: #1c1c1a;
          text-decoration: none; font-family: inherit; transition: background 0.15s;
          width: 100%;
        }
        .mobile-foot-btn:hover { background: #fafaf7; }
        .mobile-foot-btn.danger { color: #c62828; border-color: #fecaca; }
        .mobile-foot-btn.danger:hover { background: #fff5f5; }

        /* ── SEARCH OVERLAY ──────────────────────────────────── */
        .search-overlay {
          position: fixed; inset: 0; z-index: 29999;
          background: rgba(10,10,10,0.55);
          backdrop-filter: blur(6px);
          display: flex; align-items: flex-start; justify-content: center;
          padding-top: 80px;
          animation: searchFadeIn 0.18s ease;
        }
        @keyframes searchFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .search-box {
          width: 100%; max-width: 640px;
          background: #fff; border-radius: 14px;
          padding: 6px 6px 6px 20px;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          margin: 0 16px;
          animation: searchSlideDown 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes searchSlideDown {
          from { transform: translateY(-12px); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }

        .search-input {
          flex: 1; border: none; outline: none;
          font-size: 17px; font-family: inherit; color: #1c1c1a;
          background: transparent; padding: 8px 0;
        }
        .search-input::placeholder { color: #bbb; }

        .search-submit-btn {
          padding: 10px 20px; background: #1c1c1a; color: #fff;
          border: none; border-radius: 9px; cursor: pointer;
          font-size: 13px; font-weight: 600; font-family: inherit;
          white-space: nowrap; transition: background 0.15s;
          display: flex; align-items: center; gap: 6px;
        }
        .search-submit-btn:hover { background: #333; }

        .search-close-btn {
          background: none; border: none; cursor: pointer;
          color: #999; padding: 8px; display: flex;
          align-items: center; transition: color 0.15s;
          flex-shrink: 0;
        }
        .search-close-btn:hover { color: #1c1c1a; }

        .search-hint {
          text-align: center; color: rgba(255,255,255,0.5);
          font-size: 12px; margin-top: 14px; letter-spacing: 0.03em;
        }

        /* ── RESPONSIVE BREAKPOINTS ───────────────────────────── */
        @media (max-width: 768px) {
          .hamburger-btn { display: flex !important; }
          .nav-bar        { display: none !important; }
          .desktop-only   { display: none !important; }
          .search-box { max-width: 100%; margin: 0 12px; padding: 4px 4px 4px 16px; }
          .search-input { font-size: 15px; }
        }
        @media (min-width: 769px) {
          .hamburger-btn         { display: none !important; }
          .mobile-nav-backdrop   { display: none !important; }
          .mobile-nav-drawer     { display: none !important; }
        }
      `,
      }),
      (0, G.jsx)(`div`, {
        className: `mobile-nav-backdrop ${a ? `open` : ``}`,
        onClick: v,
        "aria-hidden": `true`,
      }),
      (0, G.jsxs)(`nav`, {
        className: `mobile-nav-drawer ${a ? `open` : ``}`,
        "aria-label": `Mobile navigation`,
        children: [
          (0, G.jsxs)(`div`, {
            className: `mobile-drawer-head`,
            children: [
              (0, G.jsx)(`img`, {
                src: `/images/logo_cutout.png`,
                alt: `Padmini Vastra`,
                className: `mobile-drawer-logo`,
                onError: (e) => {
                  e.target.src = `https://placehold.co/100x30/fff/000?text=Padmini+Vastra`;
                },
              }),
              (0, G.jsx)(`button`, {
                className: `mobile-drawer-close-btn`,
                onClick: v,
                "aria-label": `Close menu`,
                children: (0, G.jsx)(N, { size: 20 }),
              }),
            ],
          }),
          (0, G.jsxs)(`ul`, {
            className: `mobile-nav-list`,
            children: [
              (0, G.jsx)(`li`, {
                className: `mobile-nav-item`,
                children: (0, G.jsx)(x, {
                  to: `/`,
                  className: `mobile-nav-btn`,
                  onClick: v,
                  children: `Home`,
                }),
              }),
              C.map((e) =>
                (0, G.jsx)(
                  `li`,
                  {
                    className: `mobile-nav-item`,
                    children: e.subCategories
                      ? (0, G.jsxs)(G.Fragment, {
                          children: [
                            (0, G.jsxs)(`button`, {
                              className: `mobile-nav-btn ${s === e.name ? `expanded` : ``}`,
                              onClick: () => c(s === e.name ? null : e.name),
                              children: [
                                e.name,
                                (0, G.jsx)(g, {
                                  size: 14,
                                  className: `chevron`,
                                }),
                              ],
                            }),
                            s === e.name &&
                              (0, G.jsxs)(`div`, {
                                className: `mobile-sub-panel`,
                                children: [
                                  (0, G.jsxs)(x, {
                                    to: e.path,
                                    className: `mobile-sub-all`,
                                    onClick: v,
                                    children: [`All `, e.name, ` →`],
                                  }),
                                  e.subCategories.map((e) =>
                                    (0, G.jsxs)(
                                      B.Fragment,
                                      {
                                        children: [
                                          (0, G.jsx)(x, {
                                            to: e.path,
                                            className: `mobile-sub-group-label`,
                                            onClick: v,
                                            children: e.name,
                                          }),
                                          e.items?.map((e) =>
                                            (0, G.jsx)(
                                              x,
                                              {
                                                to: e.path,
                                                className: `mobile-sub-link`,
                                                onClick: v,
                                                children: e.name,
                                              },
                                              e.name,
                                            ),
                                          ),
                                        ],
                                      },
                                      e.name,
                                    ),
                                  ),
                                ],
                              }),
                          ],
                        })
                      : (0, G.jsxs)(x, {
                          to: e.path,
                          className: `mobile-nav-btn`,
                          onClick: v,
                          children: [e.name, (0, G.jsx)(p, { size: 14 })],
                        }),
                  },
                  e.name,
                ),
              ),
            ],
          }),
          (0, G.jsx)(`div`, {
            className: `mobile-drawer-foot`,
            children: r
              ? (0, G.jsxs)(G.Fragment, {
                  children: [
                    (0, G.jsxs)(x, {
                      to: `/orders`,
                      className: `mobile-foot-btn`,
                      onClick: v,
                      children: [(0, G.jsx)(E, { size: 15 }), ` My Orders`],
                    }),
                    r.role === `admin` &&
                      (0, G.jsxs)(x, {
                        to: `/admin`,
                        className: `mobile-foot-btn`,
                        onClick: v,
                        style: { color: `#702c3a`, borderColor: `#f0c8c8` },
                        children: [(0, G.jsx)(E, { size: 15 }), ` Admin Panel`],
                      }),
                    (0, G.jsx)(`button`, {
                      className: `mobile-foot-btn danger`,
                      onClick: S,
                      children: `Logout`,
                    }),
                  ],
                })
              : (0, G.jsxs)(`button`, {
                  className: `mobile-foot-btn`,
                  onClick: () => {
                    (v(), n(!0));
                  },
                  children: [(0, G.jsx)(E, { size: 15 }), ` Login / Register`],
                }),
          }),
        ],
      }),
      (0, G.jsxs)(`header`, {
        className: `premium-header`,
        children: [
          (0, G.jsxs)(`div`, {
            className: `top-bar`,
            children: [
              (0, G.jsx)(`div`, {
                className: `left-balance-spacer`,
                children: (0, G.jsx)(`button`, {
                  className: `hamburger-btn`,
                  onClick: () => {
                    (window.scrollTo({ top: 0, behavior: `instant` }), o(!0));
                  },
                  "aria-label": `Open navigation menu`,
                  children: (0, G.jsx)(ce, { size: 22, strokeWidth: 2 }),
                }),
              }),
              (0, G.jsx)(`div`, {
                className: `logo-container`,
                children: (0, G.jsx)(`a`, {
                  href: `/`,
                  children: (0, G.jsx)(`img`, {
                    src: `/images/logo_cutout.png`,
                    alt: `Padmini Vastra`,
                    className: `brand-logo-img`,
                    onError: (e) => {
                      ((e.target.onerror = null),
                        (e.target.src = `https://placehold.co/180x45/fff/000?text=Padmini+Vastra`));
                    },
                  }),
                }),
              }),
              (0, G.jsxs)(`div`, {
                className: `utilities`,
                children: [
                  r
                    ? (0, G.jsxs)(`div`, {
                        className: `profile-dropdown-wrapper desktop-only`,
                        children: [
                          (0, G.jsxs)(`button`, {
                            className: `profile-trigger-btn`,
                            "aria-label": `Account menu`,
                            children: [
                              (0, G.jsx)(E, { size: 14, strokeWidth: 2.2 }),
                              `Hi, `,
                              r.name.split(` `)[0],
                            ],
                          }),
                          (0, G.jsxs)(`div`, {
                            className: `profile-dropdown-menu`,
                            children: [
                              (0, G.jsx)(x, {
                                to: `/orders`,
                                className: `profile-dropdown-item`,
                                children: `My Orders`,
                              }),
                              r?.role === `admin` &&
                                (0, G.jsx)(x, {
                                  to: `/admin`,
                                  className: `profile-dropdown-item`,
                                  style: { color: `#702c3a`, fontWeight: 600 },
                                  children: `Admin Panel`,
                                }),
                              (0, G.jsx)(`button`, {
                                type: `button`,
                                className: `profile-dropdown-item`,
                                onClick: S,
                                children: `Logout`,
                              }),
                            ],
                          }),
                        ],
                      })
                    : (0, G.jsx)(`button`, {
                        onClick: () => n(!0),
                        className: `utility-link desktop-only`,
                        style: {
                          background: `none`,
                          border: `none`,
                          cursor: `pointer`,
                          padding: 0,
                        },
                        children: `Login`,
                      }),
                  (0, G.jsx)(`button`, {
                    className: `utility-btn`,
                    "aria-label": `Search`,
                    onClick: y,
                    children: (0, G.jsx)(I, { size: 18, strokeWidth: 2.2 }),
                  }),
                  (0, G.jsxs)(x, {
                    to: `/cart`,
                    className: `utility-btn`,
                    "aria-label": `Cart`,
                    children: [
                      (0, G.jsx)(z, { size: 18, strokeWidth: 2.2 }),
                      h > 0 &&
                        (0, G.jsx)(`span`, {
                          className: `cart-badge`,
                          children: h,
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, G.jsx)(`nav`, {
            className: `nav-bar`,
            children: (0, G.jsx)(`div`, {
              className: `nav-inner`,
              children: C.map((e) =>
                (0, G.jsxs)(
                  `div`,
                  {
                    className: `nav-item-wrapper`,
                    children: [
                      (0, G.jsx)(x, {
                        to: e.path,
                        className: `nav-item`,
                        children: e.name,
                      }),
                      e.subCategories &&
                        (0, G.jsx)(`div`, {
                          className: `mega-dropdown-menu`,
                          children: e.subCategories.map((e) =>
                            (0, G.jsxs)(
                              `div`,
                              {
                                className: `dropdown-column`,
                                children: [
                                  (0, G.jsx)(x, {
                                    to: e.path,
                                    className: `dropdown-heading`,
                                    children: e.name,
                                  }),
                                  e.items &&
                                    (0, G.jsx)(`ul`, {
                                      className: `dropdown-list`,
                                      children: e.items.map((e) =>
                                        (0, G.jsx)(
                                          `li`,
                                          {
                                            children: (0, G.jsx)(x, {
                                              to: e.path,
                                              className: `dropdown-link`,
                                              children: e.name,
                                            }),
                                          },
                                          e.name,
                                        ),
                                      ),
                                    }),
                                ],
                              },
                              e.name,
                            ),
                          ),
                        }),
                    ],
                  },
                  e.name,
                ),
              ),
            }),
          }),
        ],
      }),
      l &&
        (0, G.jsx)(`div`, {
          className: `search-overlay`,
          onClick: () => u(!1),
          children: (0, G.jsxs)(`div`, {
            style: {
              width: `100%`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
            },
            children: [
              (0, G.jsxs)(`form`, {
                className: `search-box`,
                onSubmit: b,
                onClick: (e) => e.stopPropagation(),
                children: [
                  (0, G.jsx)(I, {
                    size: 18,
                    strokeWidth: 2,
                    style: { color: `#bbb`, flexShrink: 0 },
                  }),
                  (0, G.jsx)(`input`, {
                    className: `search-input`,
                    type: `search`,
                    placeholder: `Search products, categories…`,
                    value: f,
                    onChange: (e) => m(e.target.value),
                    autoFocus: !0,
                    autoComplete: `off`,
                  }),
                  f &&
                    (0, G.jsx)(`button`, {
                      type: `button`,
                      className: `search-close-btn`,
                      onClick: () => m(``),
                      "aria-label": `Clear`,
                      children: (0, G.jsx)(N, { size: 16 }),
                    }),
                  (0, G.jsxs)(`button`, {
                    type: `submit`,
                    className: `search-submit-btn`,
                    children: [(0, G.jsx)(I, { size: 14 }), ` Search`],
                  }),
                ],
              }),
              (0, G.jsx)(`p`, {
                className: `search-hint`,
                children: `Press Enter to search · Esc to close`,
              }),
            ],
          }),
        }),
      t &&
        (0, G.jsx)(`div`, {
          className: `login-modal-overlay`,
          onClick: () => n(!1),
          children: (0, G.jsxs)(`div`, {
            className: `login-modal-content`,
            onClick: (e) => e.stopPropagation(),
            children: [
              (0, G.jsx)(`button`, {
                className: `login-modal-close-btn`,
                onClick: () => n(!1),
                "aria-label": `Close`,
                children: (0, G.jsx)(N, { size: 20, strokeWidth: 2 }),
              }),
              (0, G.jsx)(`div`, {
                className: `login-inner-component-wrapper`,
                children: (0, G.jsx)(be, {
                  onSuccess: () => {
                    n(!1);
                    let e = localStorage.getItem(`user`);
                    e && i(JSON.parse(e));
                  },
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
function je() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        dangerouslySetInnerHTML: {
          __html: `
        .premium-footer {
          background-color: #788089;
          color: #ffffff;
          padding: 60px 40px 30px 40px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .footer-main-row {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 40px;
          padding-bottom: 40px;
        }

        .footer-brand-column {
          flex: 1.5;
          min-width: 250px;
        }

        .footer-logo-img {
          height: 70px;
          width: auto;
          object-fit: contain;
          margin-bottom: 16px;
        }

        .footer-brand-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 280px;
        }

        .footer-nav-column {
          flex: 1;
          min-width: 140px;
        }

        .footer-column-heading {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #ffffff;
          text-transform: uppercase;
          margin-bottom: 20px;
          text-align: left;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }

        .footer-link-item {
          font-size: 16px;
          color: #cdd3da;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .footer-link-item:hover {
          color: #ffffff;
        }

        .footer-link-upcoming {
          position: relative;
          cursor: default;
          color: #cdd3da;
        }

        .footer-link-upcoming:hover {
          color: #cdd3da;
        }

        .footer-upcoming-badge {
          position: absolute;
          left: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%) translateX(-6px);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #11151a;
          background: #ffffff;
          padding: 4px 10px;
          border-radius: 4px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
        }

        .footer-link-upcoming:hover .footer-upcoming-badge {
          opacity: 1;
          visibility: visible;
          transform: translateY(-50%) translateX(0);
        }

        .footer-bottom-bar {
          max-width: 1300px;
          margin: 0 auto;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .copyright-text {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.03em;
        }

        @media (max-width: 768px) {
          .premium-footer {
            padding: 40px 20px 24px 20px;
          }
          .footer-main-row {
            flex-direction: column;
            gap: 24px;
          }
          .footer-brand-column {
            width: 100%;
            margin-bottom: 0;
          }
        }
      `,
        },
      }),
      (0, G.jsxs)(`footer`, {
        className: `premium-footer`,
        children: [
          (0, G.jsxs)(`div`, {
            className: `footer-main-row`,
            children: [
              (0, G.jsxs)(`div`, {
                className: `footer-brand-column`,
                children: [
                  (0, G.jsx)(`img`, {
                    src: `/images/logo_cutout.png`,
                    alt: `Padmini Vastra Logo`,
                    className: `footer-logo-img`,
                    onError: (e) => {
                      ((e.target.onerror = null),
                        (e.target.src = `https://placehold.co/180x45/11151a/ffffff?text=Padmini+Vastra`));
                    },
                  }),
                  (0, G.jsx)(`p`, {
                    className: `footer-brand-desc`,
                    children: `Padmini Vastra is an online saree brand celebrating Indian handlooms. We bring you authentic Kalyani Cotton, Mulcotton, Linen, khadi cotton and Tissue sarees sourced directly from weaving clusters.`,
                  }),
                ],
              }),
              (0, G.jsxs)(`div`, {
                className: `footer-nav-column`,
                children: [
                  (0, G.jsx)(`h4`, {
                    className: `footer-column-heading`,
                    children: `Policies`,
                  }),
                  (0, G.jsxs)(`ul`, {
                    className: `footer-links-list`,
                    children: [
                      (0, G.jsx)(`li`, {
                        children: (0, G.jsx)(x, {
                          to: `/return-policy`,
                          className: `footer-link-item`,
                          children: `Refund Policy`,
                        }),
                      }),
                      (0, G.jsx)(`li`, {
                        children: (0, G.jsx)(x, {
                          to: `/shipping-policy`,
                          className: `footer-link-item`,
                          children: `Shipping Policy`,
                        }),
                      }),
                      (0, G.jsx)(`li`, {
                        children: (0, G.jsx)(x, {
                          to: `/terms-of-service`,
                          className: `footer-link-item`,
                          children: `Terms Of Service`,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, G.jsxs)(`div`, {
                className: `footer-nav-column`,
                children: [
                  (0, G.jsx)(`h4`, {
                    className: `footer-column-heading`,
                    children: `Support`,
                  }),
                  (0, G.jsxs)(`ul`, {
                    className: `footer-links-list`,
                    children: [
                      (0, G.jsx)(`li`, {
                        children: (0, G.jsx)(x, {
                          to: `/contact`,
                          className: `footer-link-item`,
                          children: `Contact Information`,
                        }),
                      }),
                      (0, G.jsx)(`li`, {
                        children: (0, G.jsx)(x, {
                          to: `/return-policy`,
                          className: `footer-link-item`,
                          children: `Create Return / Exchange`,
                        }),
                      }),
                      (0, G.jsx)(`li`, {
                        children: (0, G.jsx)(`a`, {
                          href: `/manage_homepage.php`,
                          className: `footer-link-item`,
                          children: `Manage Homepage`,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, G.jsxs)(`div`, {
                className: `footer-nav-column`,
                children: [
                  (0, G.jsx)(`h4`, {
                    className: `footer-column-heading`,
                    children: `Follow us on`,
                  }),
                  (0, G.jsxs)(`ul`, {
                    className: `footer-links-list`,
                    children: [
                      (0, G.jsx)(`li`, {
                        children: (0, G.jsxs)(`a`, {
                          href: `https://www.instagram.com/padminivasthra?igsh=MWk4eHhkaHFzdXNlbQ%3D%3D&utm_source=qr`,
                          target: `_blank`,
                          rel: `noopener noreferrer`,
                          className: `footer-link-item`,
                          children: [
                            (0, G.jsxs)(`svg`, {
                              width: `14`,
                              height: `14`,
                              viewBox: `0 0 24 24`,
                              fill: `none`,
                              stroke: `currentColor`,
                              strokeWidth: `2.5`,
                              strokeLinecap: `round`,
                              strokeLinejoin: `round`,
                              children: [
                                (0, G.jsx)(`rect`, {
                                  x: `2`,
                                  y: `2`,
                                  width: `20`,
                                  height: `20`,
                                  rx: `5`,
                                  ry: `5`,
                                }),
                                (0, G.jsx)(`path`, {
                                  d: `M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z`,
                                }),
                                (0, G.jsx)(`line`, {
                                  x1: `17.5`,
                                  y1: `6.5`,
                                  x2: `17.51`,
                                  y2: `6.5`,
                                }),
                              ],
                            }),
                            `Instagram`,
                          ],
                        }),
                      }),
                      (0, G.jsx)(`li`, {
                        children: (0, G.jsxs)(`a`, {
                          href: `https://www.facebook.com/share/1E6cJLryN9/?mibextid=wwXIfr`,
                          target: `_blank`,
                          rel: `noopener noreferrer`,
                          className: `footer-link-item`,
                          children: [
                            (0, G.jsx)(`svg`, {
                              width: `14`,
                              height: `14`,
                              viewBox: `0 0 24 24`,
                              fill: `none`,
                              stroke: `currentColor`,
                              strokeWidth: `2.5`,
                              strokeLinecap: `round`,
                              strokeLinejoin: `round`,
                              children: (0, G.jsx)(`path`, {
                                d: `M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z`,
                              }),
                            }),
                            `Facebook`,
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, G.jsx)(`div`, {
            className: `footer-bottom-bar`,
            children: (0, G.jsxs)(`p`, {
              className: `copyright-text`,
              children: [
                `© `,
                new Date().getFullYear(),
                ` PADMINI VASTRA. All rights reserved.`,
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
var Me = {
    fullName: ``,
    mobile: ``,
    alternateMobile: ``,
    houseNo: ``,
    street: ``,
    landmark: ``,
    city: ``,
    state: ``,
    country: `India`,
    pincode: ``,
    addressType: `Home`,
  },
  Ne = [
    `fullName`,
    `mobile`,
    `houseNo`,
    `street`,
    `city`,
    `state`,
    `country`,
    `pincode`,
  ],
  Pe = {
    Home: { icon: i, color: `#2563eb`, bg: `#eff6ff` },
    Work: { icon: f, color: `#059669`, bg: `#ecfdf5` },
    Other: { icon: P, color: `#7c3aed`, bg: `#f5f3ff` },
  };
function Q({ label: e, required: t, error: n, children: r }) {
  return (0, G.jsxs)(`div`, {
    style: { display: `flex`, flexDirection: `column`, gap: `5px` },
    children: [
      (0, G.jsxs)(`label`, {
        style: Fe.label,
        children: [
          e,
          t &&
            (0, G.jsx)(`span`, { style: { color: `#c62828` }, children: ` *` }),
        ],
      }),
      r,
      n && (0, G.jsx)(`span`, { style: Fe.errorMsg, children: n }),
    ],
  });
}
var Fe = {
  label: {
    fontSize: `11px`,
    fontWeight: `600`,
    textTransform: `uppercase`,
    letterSpacing: `0.07em`,
    color: `#777`,
  },
  input: {
    padding: `9px 12px`,
    border: `1px solid #e0e0e0`,
    borderRadius: `6px`,
    fontSize: `13px`,
    fontFamily: `inherit`,
    color: `#1c1c1a`,
    outline: `none`,
    width: `100%`,
    boxSizing: `border-box`,
    transition: `border-color 0.15s`,
  },
  inputErr: { borderColor: `#c62828` },
  errorMsg: { fontSize: `11px`, color: `#c62828` },
};
function Ie({ selectedId: e, onAddressSelect: t }) {
  let [n, r] = (0, B.useState)([]),
    [i, a] = (0, B.useState)(!0),
    [s, c] = (0, B.useState)(`list`),
    [l, u] = (0, B.useState)(null),
    [d, f] = (0, B.useState)(Me),
    [p, m] = (0, B.useState)({}),
    [h, g] = (0, B.useState)(!1),
    [_, y] = (0, B.useState)(null),
    [b, x] = (0, B.useState)(``),
    S = {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${localStorage.getItem(`token`)}`,
    };
  (0, B.useEffect)(() => {
    C();
  }, []);
  let C = async () => {
      try {
        a(!0);
        let n = await (await fetch(`${H}/addresses`, { headers: S })).json();
        n.success &&
          (r(n.addresses),
          !e &&
            n.addresses.length > 0 &&
            t(n.addresses.find((e) => e.isDefault) || n.addresses[0]));
      } catch (e) {
        console.error(`Failed to fetch addresses:`, e);
      } finally {
        a(!1);
      }
    },
    w = (e, t) => {
      (f((n) => ({ ...n, [e]: t })), p[e] && m((t) => ({ ...t, [e]: `` })));
    },
    T = (e) => ({
      value: d[e],
      onChange: (t) => w(e, t.target.value),
      style: { ...Fe.input, ...(p[e] ? Fe.inputErr : {}) },
    }),
    E = () => {
      let e = {};
      return (
        Ne.forEach((t) => {
          d[t]?.trim() || (e[t] = `This field is required`);
        }),
        d.mobile &&
          !/^\d{10}$/.test(d.mobile.trim()) &&
          (e.mobile = `Enter a valid 10-digit mobile number`),
        d.alternateMobile &&
          !/^\d{10}$/.test(d.alternateMobile.trim()) &&
          (e.alternateMobile = `Enter a valid 10-digit number`),
        d.pincode &&
          !/^\d{6}$/.test(d.pincode.trim()) &&
          (e.pincode = `Enter a valid 6-digit pincode`),
        e
      );
    },
    D = () => {
      (u(null), f(Me), m({}), x(``), c(`form`));
    },
    O = (e) => {
      (u(e._id),
        f({
          fullName: e.fullName || ``,
          mobile: e.mobile || ``,
          alternateMobile: e.alternateMobile || ``,
          houseNo: e.houseNo || ``,
          street: e.street || ``,
          landmark: e.landmark || ``,
          city: e.city || ``,
          state: e.state || ``,
          country: e.country || `India`,
          pincode: e.pincode || ``,
          addressType: e.addressType || `Home`,
        }),
        m({}),
        x(``),
        c(`form`));
    },
    k = () => {
      (c(`list`), u(null), f(Me), m({}), x(``));
    },
    A = async (i) => {
      i.preventDefault();
      let a = E();
      if (Object.keys(a).length > 0) {
        m(a);
        return;
      }
      (g(!0), x(``));
      try {
        let i = l ? `${H}/addresses/${l}` : `${H}/addresses`,
          a = await (
            await fetch(i, {
              method: l ? `PUT` : `POST`,
              headers: S,
              body: JSON.stringify(d),
            })
          ).json();
        a.success
          ? (l
              ? (r((e) => e.map((e) => (e._id === l ? a.address : e))),
                e === l && t(a.address))
              : (r([a.address, ...n]), t(a.address)),
            k())
          : x(a.error || `Failed to save address. Please try again.`);
      } catch {
        x(`Network error. Please check your connection.`);
      } finally {
        g(!1);
      }
    },
    M = async (i) => {
      if (window.confirm(`Remove this address?`)) {
        y(i);
        try {
          if (
            (
              await (
                await fetch(`/api/index.php/addresses/${i}`, {
                  method: `DELETE`,
                  headers: S,
                })
              ).json()
            ).success
          ) {
            let a = n.filter((e) => e._id !== i);
            (r(a), e === i && t(a.length > 0 ? a[0] : null));
          }
        } catch (e) {
          console.error(`Delete error:`, e);
        } finally {
          y(null);
        }
      }
    };
  return i
    ? (0, G.jsx)(`div`, {
        style: {
          padding: `40px`,
          textAlign: `center`,
          color: `#aaa`,
          fontSize: `13px`,
        },
        children: `Loading saved addresses...`,
      })
    : s === `form`
      ? (0, G.jsxs)(`div`, {
          className: `am-form-wrap`,
          style: $.formWrap,
          children: [
            (0, G.jsx)(`style`, {
              children: `
          .am-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 16px; }
          @media (max-width: 480px) {
            .am-form-grid { grid-template-columns: 1fr !important; }
            .am-form-wrap { padding: 16px !important; }
            .am-form-actions { flex-direction: column !important; }
            .am-form-actions button { width: 100% !important; }
          }
          .am-addr-card { border: 2px solid #e8e8e8; border-radius: 10px; padding: 16px 18px; cursor: pointer; background: #fff; transition: border-color 0.15s, background 0.15s; position: relative; }
          .am-addr-card.selected { border-color: #1c1c1a; background: #fafaf7; }
          @media (max-width: 480px) {
            .am-addr-card { padding: 12px 14px; }
          }
        `,
            }),
            (0, G.jsxs)(`div`, {
              style: $.formHeader,
              children: [
                (0, G.jsx)(`span`, {
                  style: $.formTitle,
                  children: l ? `Edit Address` : `Add New Address`,
                }),
                (0, G.jsx)(`button`, {
                  onClick: k,
                  style: $.iconBtn,
                  title: `Cancel`,
                  children: (0, G.jsx)(N, { size: 16 }),
                }),
              ],
            }),
            (0, G.jsxs)(`form`, {
              onSubmit: A,
              noValidate: !0,
              children: [
                (0, G.jsxs)(`div`, {
                  className: `am-form-grid`,
                  children: [
                    (0, G.jsx)(`div`, {
                      style: { gridColumn: `1 / -1` },
                      children: (0, G.jsx)(Q, {
                        label: `Full Name`,
                        required: !0,
                        error: p.fullName,
                        children: (0, G.jsx)(`input`, {
                          ...T(`fullName`),
                          placeholder: `As per delivery records`,
                        }),
                      }),
                    }),
                    (0, G.jsx)(Q, {
                      label: `Mobile Number`,
                      required: !0,
                      error: p.mobile,
                      children: (0, G.jsx)(`input`, {
                        ...T(`mobile`),
                        placeholder: `10-digit number`,
                        maxLength: 10,
                      }),
                    }),
                    (0, G.jsx)(Q, {
                      label: `Alternate Mobile`,
                      error: p.alternateMobile,
                      children: (0, G.jsx)(`input`, {
                        ...T(`alternateMobile`),
                        placeholder: `Optional`,
                        maxLength: 10,
                      }),
                    }),
                    (0, G.jsx)(Q, {
                      label: `House / Flat No.`,
                      required: !0,
                      error: p.houseNo,
                      children: (0, G.jsx)(`input`, {
                        ...T(`houseNo`),
                        placeholder: `e.g. 12B, Tower A`,
                      }),
                    }),
                    (0, G.jsx)(Q, {
                      label: `Pincode`,
                      required: !0,
                      error: p.pincode,
                      children: (0, G.jsx)(`input`, {
                        ...T(`pincode`),
                        placeholder: `6-digit pincode`,
                        maxLength: 6,
                      }),
                    }),
                    (0, G.jsx)(`div`, {
                      style: { gridColumn: `1 / -1` },
                      children: (0, G.jsx)(Q, {
                        label: `Street / Area / Colony`,
                        required: !0,
                        error: p.street,
                        children: (0, G.jsx)(`input`, {
                          ...T(`street`),
                          placeholder: `e.g. MG Road, Sector 12`,
                        }),
                      }),
                    }),
                    (0, G.jsx)(`div`, {
                      style: { gridColumn: `1 / -1` },
                      children: (0, G.jsx)(Q, {
                        label: `Landmark`,
                        error: p.landmark,
                        children: (0, G.jsx)(`input`, {
                          ...T(`landmark`),
                          placeholder: `Optional — e.g. Near City Mall`,
                        }),
                      }),
                    }),
                    (0, G.jsx)(Q, {
                      label: `City`,
                      required: !0,
                      error: p.city,
                      children: (0, G.jsx)(`input`, {
                        ...T(`city`),
                        placeholder: `e.g. Mumbai`,
                      }),
                    }),
                    (0, G.jsx)(Q, {
                      label: `State`,
                      required: !0,
                      error: p.state,
                      children: (0, G.jsx)(`input`, {
                        ...T(`state`),
                        placeholder: `e.g. Maharashtra`,
                      }),
                    }),
                    (0, G.jsx)(Q, {
                      label: `Country`,
                      required: !0,
                      error: p.country,
                      children: (0, G.jsx)(`input`, {
                        ...T(`country`),
                        placeholder: `e.g. India`,
                      }),
                    }),
                    (0, G.jsx)(Q, {
                      label: `Address Type`,
                      children: (0, G.jsx)(`div`, {
                        style: { display: `flex`, gap: `10px` },
                        children: [`Home`, `Work`, `Other`].map((e) => {
                          let t = Pe[e],
                            n = t.icon,
                            r = d.addressType === e;
                          return (0, G.jsxs)(
                            `button`,
                            {
                              type: `button`,
                              onClick: () => w(`addressType`, e),
                              style: {
                                flex: 1,
                                padding: `8px 4px`,
                                border: `1.5px solid ${r ? t.color : `#e0e0e0`}`,
                                borderRadius: `8px`,
                                background: r ? t.bg : `#fff`,
                                color: r ? t.color : `#888`,
                                cursor: `pointer`,
                                display: `flex`,
                                flexDirection: `column`,
                                alignItems: `center`,
                                gap: `4px`,
                                fontSize: `11px`,
                                fontWeight: r ? `700` : `400`,
                                transition: `all 0.15s`,
                                fontFamily: `inherit`,
                              },
                              children: [(0, G.jsx)(n, { size: 14 }), e],
                            },
                            e,
                          );
                        }),
                      }),
                    }),
                  ],
                }),
                b &&
                  (0, G.jsx)(`div`, {
                    style: {
                      marginTop: `14px`,
                      padding: `10px 14px`,
                      background: `#fff5f5`,
                      border: `1px solid #fecaca`,
                      borderRadius: `6px`,
                      fontSize: `12px`,
                      color: `#c62828`,
                    },
                    children: b,
                  }),
                (0, G.jsxs)(`div`, {
                  className: `am-form-actions`,
                  style: { display: `flex`, gap: `10px`, marginTop: `20px` },
                  children: [
                    (0, G.jsx)(`button`, {
                      type: `submit`,
                      disabled: h,
                      style: $.submitBtn(h),
                      children: h
                        ? `Saving...`
                        : l
                          ? `Update Address`
                          : `Save Address`,
                    }),
                    (0, G.jsx)(`button`, {
                      type: `button`,
                      onClick: k,
                      style: $.cancelBtn,
                      children: `Cancel`,
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      : (0, G.jsxs)(`div`, {
          children: [
            (0, G.jsx)(`style`, {
              children: `
        .am-addr-card { border: 2px solid #e8e8e8; border-radius: 10px; padding: 16px 18px; cursor: pointer; background: #fff; transition: border-color 0.15s, background 0.15s; position: relative; }
        .am-addr-card.selected { border-color: #1c1c1a; background: #fafaf7; }
        @media (max-width: 480px) { .am-addr-card { padding: 12px 14px; } }
      `,
            }),
            n.length === 0
              ? (0, G.jsxs)(`div`, {
                  style: $.emptyState,
                  children: [
                    (0, G.jsx)(v, {
                      size: 28,
                      strokeWidth: 1.5,
                      style: { color: `#ccc`, marginBottom: `10px` },
                    }),
                    (0, G.jsx)(`div`, {
                      style: {
                        fontSize: `14px`,
                        fontWeight: `500`,
                        color: `#555`,
                        marginBottom: `6px`,
                      },
                      children: `No saved addresses`,
                    }),
                    (0, G.jsx)(`div`, {
                      style: {
                        fontSize: `12px`,
                        color: `#aaa`,
                        marginBottom: `20px`,
                      },
                      children: `Add a delivery address to continue.`,
                    }),
                    (0, G.jsxs)(`button`, {
                      onClick: D,
                      style: $.addFirstBtn,
                      children: [
                        (0, G.jsx)(j, { size: 14 }),
                        ` Add Delivery Address`,
                      ],
                    }),
                  ],
                })
              : (0, G.jsxs)(G.Fragment, {
                  children: [
                    (0, G.jsx)(`div`, {
                      style: {
                        display: `flex`,
                        flexDirection: `column`,
                        gap: `12px`,
                      },
                      children: n.map((n) => {
                        let r = e === n._id,
                          i = Pe[n.addressType] || Pe.Home,
                          a = i.icon;
                        return (0, G.jsxs)(
                          `div`,
                          {
                            onClick: () => t(n),
                            className: `am-addr-card${r ? ` selected` : ``}`,
                            children: [
                              r &&
                                (0, G.jsx)(`div`, {
                                  style: {
                                    position: `absolute`,
                                    top: `14px`,
                                    right: `14px`,
                                    width: `20px`,
                                    height: `20px`,
                                    borderRadius: `50%`,
                                    background: `#1c1c1a`,
                                    display: `flex`,
                                    alignItems: `center`,
                                    justifyContent: `center`,
                                  },
                                  children: (0, G.jsx)(o, {
                                    size: 11,
                                    color: `#fff`,
                                    strokeWidth: 3,
                                  }),
                                }),
                              (0, G.jsxs)(`div`, {
                                style: {
                                  display: `flex`,
                                  alignItems: `flex-start`,
                                  gap: `12px`,
                                },
                                children: [
                                  (0, G.jsx)(`div`, {
                                    style: {
                                      marginTop: `2px`,
                                      width: `18px`,
                                      height: `18px`,
                                      borderRadius: `50%`,
                                      border: `2px solid ${r ? `#1c1c1a` : `#ccc`}`,
                                      background: r ? `#1c1c1a` : `#fff`,
                                      flexShrink: 0,
                                    },
                                  }),
                                  (0, G.jsxs)(`div`, {
                                    style: { flex: 1, minWidth: 0 },
                                    children: [
                                      (0, G.jsxs)(`div`, {
                                        style: {
                                          display: `flex`,
                                          alignItems: `center`,
                                          gap: `8px`,
                                          marginBottom: `4px`,
                                          flexWrap: `wrap`,
                                        },
                                        children: [
                                          (0, G.jsx)(`span`, {
                                            style: {
                                              fontWeight: `600`,
                                              fontSize: `14px`,
                                              color: `#1c1c1a`,
                                            },
                                            children: n.fullName,
                                          }),
                                          (0, G.jsxs)(`span`, {
                                            style: {
                                              display: `inline-flex`,
                                              alignItems: `center`,
                                              gap: `4px`,
                                              padding: `2px 8px`,
                                              borderRadius: `20px`,
                                              background: i.bg,
                                              color: i.color,
                                              fontSize: `10px`,
                                              fontWeight: `700`,
                                              textTransform: `uppercase`,
                                              letterSpacing: `0.04em`,
                                            },
                                            children: [
                                              (0, G.jsx)(a, { size: 10 }),
                                              ` `,
                                              n.addressType,
                                            ],
                                          }),
                                          n.isDefault &&
                                            (0, G.jsx)(`span`, {
                                              style: {
                                                padding: `2px 8px`,
                                                borderRadius: `20px`,
                                                background: `#f0ece6`,
                                                color: `#8b7355`,
                                                fontSize: `10px`,
                                                fontWeight: `700`,
                                                textTransform: `uppercase`,
                                                letterSpacing: `0.04em`,
                                              },
                                              children: `Default`,
                                            }),
                                        ],
                                      }),
                                      (0, G.jsxs)(`div`, {
                                        style: {
                                          fontSize: `12px`,
                                          color: `#666`,
                                          marginBottom: `4px`,
                                        },
                                        children: [
                                          n.mobile,
                                          n.alternateMobile
                                            ? `, ${n.alternateMobile}`
                                            : ``,
                                        ],
                                      }),
                                      (0, G.jsxs)(`div`, {
                                        style: {
                                          fontSize: `13px`,
                                          color: `#444`,
                                          lineHeight: `1.6`,
                                        },
                                        children: [
                                          n.houseNo,
                                          `, `,
                                          n.street,
                                          n.landmark ? `, ${n.landmark}` : ``,
                                          (0, G.jsx)(`br`, {}),
                                          n.city,
                                          `, `,
                                          n.state,
                                          ` — `,
                                          n.pincode,
                                          (0, G.jsx)(`br`, {}),
                                          n.country,
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, G.jsxs)(`div`, {
                                style: {
                                  display: `flex`,
                                  gap: `8px`,
                                  marginTop: `14px`,
                                  paddingTop: `12px`,
                                  borderTop: `1px solid #f0f0f0`,
                                },
                                onClick: (e) => e.stopPropagation(),
                                children: [
                                  (0, G.jsxs)(`button`, {
                                    onClick: () => O(n),
                                    style: $.actionBtn(`#8b7355`),
                                    children: [
                                      (0, G.jsx)(oe, { size: 12 }),
                                      ` Edit`,
                                    ],
                                  }),
                                  (0, G.jsxs)(`button`, {
                                    onClick: () => M(n._id),
                                    disabled: _ === n._id,
                                    style: $.actionBtn(`#c62828`),
                                    children: [
                                      (0, G.jsx)(ae, { size: 12 }),
                                      _ === n._id ? `Removing...` : `Delete`,
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          },
                          n._id,
                        );
                      }),
                    }),
                    (0, G.jsxs)(`button`, {
                      onClick: D,
                      style: $.addMoreBtn,
                      children: [
                        (0, G.jsx)(j, { size: 14 }),
                        ` Add New Address`,
                      ],
                    }),
                  ],
                }),
          ],
        });
}
var $ = {
  formWrap: {
    background: `#fff`,
    border: `1px solid #e8e8e8`,
    borderRadius: `10px`,
    padding: `22px 24px`,
  },
  formHeader: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    marginBottom: `20px`,
  },
  formTitle: { fontSize: `15px`, fontWeight: `600`, color: `#1c1c1a` },
  iconBtn: {
    background: `none`,
    border: `none`,
    cursor: `pointer`,
    color: `#888`,
    padding: `4px`,
    display: `flex`,
    alignItems: `center`,
    borderRadius: `4px`,
  },
  formGrid: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr`,
    gap: `14px 16px`,
  },
  submitBtn: (e) => ({
    padding: `10px 24px`,
    background: e ? `#aaa` : `#1c1c1a`,
    color: `#fff`,
    border: `none`,
    borderRadius: `6px`,
    fontSize: `13px`,
    fontWeight: `600`,
    cursor: e ? `not-allowed` : `pointer`,
    fontFamily: `inherit`,
    letterSpacing: `0.02em`,
  }),
  cancelBtn: {
    padding: `10px 18px`,
    background: `transparent`,
    color: `#888`,
    border: `1px solid #ddd`,
    borderRadius: `6px`,
    fontSize: `13px`,
    cursor: `pointer`,
    fontFamily: `inherit`,
  },
  emptyState: {
    textAlign: `center`,
    padding: `40px 20px`,
    background: `#fafaf7`,
    borderRadius: `10px`,
    border: `1px dashed #e0e0e0`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
  },
  addFirstBtn: {
    display: `inline-flex`,
    alignItems: `center`,
    gap: `6px`,
    padding: `10px 20px`,
    background: `#1c1c1a`,
    color: `#fff`,
    border: `none`,
    borderRadius: `6px`,
    fontSize: `13px`,
    fontWeight: `600`,
    cursor: `pointer`,
    fontFamily: `inherit`,
  },
  addMoreBtn: {
    display: `flex`,
    alignItems: `center`,
    gap: `6px`,
    marginTop: `14px`,
    padding: `9px 16px`,
    background: `transparent`,
    color: `#555`,
    border: `1.5px dashed #ccc`,
    borderRadius: `8px`,
    fontSize: `13px`,
    cursor: `pointer`,
    fontFamily: `inherit`,
    width: `100%`,
    justifyContent: `center`,
    transition: `border-color 0.15s, color 0.15s`,
  },
  actionBtn: (e) => ({
    display: `inline-flex`,
    alignItems: `center`,
    gap: `5px`,
    padding: `5px 12px`,
    background: `transparent`,
    color: e,
    border: `1px solid ${e}`,
    borderRadius: `5px`,
    fontSize: `11px`,
    fontWeight: `600`,
    cursor: `pointer`,
    fontFamily: `inherit`,
    letterSpacing: `0.02em`,
    transition: `opacity 0.15s`,
  }),
};
function Le() {
  let e = d(),
    [n, r] = (0, B.useState)(`cart`),
    [i, a] = (0, B.useState)(null),
    [o, s] = (0, B.useState)(``),
    [c, l] = (0, B.useState)(null),
    [u, f] = (0, B.useState)(null),
    [h, g] = (0, B.useState)(!1),
    [_, y] = (0, B.useState)(!1),
    [b, S] = (0, B.useState)(null),
    C = (() => {
      try {
        return JSON.parse(localStorage.getItem(`user`) || `null`);
      } catch {
        return null;
      }
    })(),
    [w, O] = (0, B.useState)(``),
    [k, M] = (0, B.useState)([]),
    [N, P] = (0, B.useState)(!0),
    [F, I] = (0, B.useState)(!1),
    L = !!localStorage.getItem(`token`);
  (0, B.useEffect)(() => {
    if (L)
      (async () => {
        let e = localStorage.getItem(`token`);
        try {
          let t = await fetch(`${H}/cart`, {
              headers: { Authorization: `Bearer ${e}` },
            }),
            n = await t.json();
          t.ok && n.cart && M(n.cart.items || []);
        } catch (e) {
          console.error(`Cart fetch error:`, e);
        } finally {
          P(!1);
        }
      })();
    else {
      (M(pe()), P(!1));
      let e = () => M(pe());
      return (
        window.addEventListener(`guestCartUpdated`, e),
        () => window.removeEventListener(`guestCartUpdated`, e)
      );
    }
  }, [L]);
  let re = async (e, t, n) => {
      let r = t + n;
      if (r < 1) return;
      if (!L) {
        M(W(e.productId, r, e.variant));
        return;
      }
      let i = e._id || e.productId;
      M((e) =>
        e.map((e) =>
          (e._id || e.productId) === i ? { ...e, quantity: r } : e,
        ),
      );
      let a = localStorage.getItem(`token`);
      try {
        await fetch(`${H}/cart/update`, {
          method: `PUT`,
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${a}`,
          },
          body: JSON.stringify({
            productId: e.productId,
            cartItemId: e._id,
            quantity: r,
          }),
        });
      } catch (e) {
        console.error(`Quantity sync error:`, e);
      }
    },
    ie = async (e) => {
      if (!L) {
        M(ge(e.productId, e.variant));
        return;
      }
      let t = e._id || e.productId;
      if (!t) return;
      M((e) => e.filter((e) => (e._id || e.productId) !== t));
      let n = localStorage.getItem(`token`);
      try {
        await fetch(`${H}/cart/remove/${t}`, {
          method: `DELETE`,
          headers: { Authorization: `Bearer ${n}` },
        });
      } catch (e) {
        console.error(`Remove item error:`, e);
      }
    },
    R = k.reduce((e, t) => e + t.price * t.quantity, 0),
    z = async (t, n) => {
      let r = !!t,
        a = t || localStorage.getItem(`token`);
      if (!r && !i) {
        alert(`Please select a delivery address.`);
        return;
      }
      if (k.length === 0) return;
      I(!0);
      let o = { name: `Valued Customer`, email: `customer@anaya.com` };
      try {
        let e = localStorage.getItem(`user`);
        e && !r && (o = JSON.parse(e));
      } catch {}
      r && c && (o = { name: c.name, email: `guest@anaya.com` });
      let s = r ? n || u : null;
      try {
        let t = await fetch(`${H}/checkout/create-order`, {
            method: `POST`,
            headers: {
              "Content-Type": `application/json`,
              Authorization: `Bearer ${a}`,
            },
            body: JSON.stringify({
              items: k,
              note: w,
              ...(r ? { guestDeliveryAddress: s } : { addressId: i?._id }),
            }),
          }),
          n = await t.json();
        if (!t.ok) throw Error(n.error || `Failed to create payment order.`);
        let l = {
            key: n.keyId,
            amount: n.amount,
            currency: `INR`,
            name: `Padmini Vastra`,
            description: `Premium Cotton Linen Purchase`,
            image: `/images/logo_cutout.png`,
            order_id: n.id,
            prefill: {
              name: (r ? c?.name : i?.fullName) || o.name,
              email: o.email,
              contact: (r ? c?.phone : i?.mobile) || ``,
            },
            theme: { color: `#1c1c1a` },
            handler: async (t) => {
              try {
                let n = await fetch(`${H}/checkout/verify-payment`, {
                    method: `POST`,
                    headers: {
                      "Content-Type": `application/json`,
                      Authorization: `Bearer ${a}`,
                    },
                    body: JSON.stringify({
                      razorpay_order_id: t.razorpay_order_id,
                      razorpay_payment_id: t.razorpay_payment_id,
                      razorpay_signature: t.razorpay_signature,
                      items: k,
                      note: w,
                      ...(r
                        ? { guestDeliveryAddress: s }
                        : { addressId: i?._id }),
                    }),
                  }),
                  o = await n.json();
                n.ok && o.success
                  ? (alert(`Payment successful! Your order has been placed.`),
                    M([]),
                    e(`/orders`))
                  : alert(
                      `Payment verification failed. Please contact support.`,
                    );
              } catch (e) {
                (console.error(`Verification error:`, e),
                  alert(
                    `Payment was deducted but we could not confirm your order due to a network error. Please contact support with your payment ID: ` +
                      (t?.razorpay_payment_id || `unknown`),
                  ));
              }
            },
          },
          u = new window.Razorpay(l);
        (u.on(`payment.failed`, (e) =>
          alert(`Payment failed: ${e.error.description}`),
        ),
          u.open());
      } catch (e) {
        alert(`Payment Error: ${e.message}`);
      } finally {
        I(!1);
      }
    },
    oe = async (e, t) => {
      let n = !!e,
        r = e || localStorage.getItem(`token`);
      if (!n && !i) {
        alert(`Please select a delivery address.`);
        return;
      }
      if (k.length !== 0) {
        I(!0);
        try {
          let e = await fetch(`${H}/checkout/cod`, {
              method: `POST`,
              headers: {
                "Content-Type": `application/json`,
                Authorization: `Bearer ${r}`,
              },
              body: JSON.stringify({
                items: k,
                note: w,
                ...(n ? { guestDeliveryAddress: t } : { addressId: i?._id }),
              }),
            }),
            a = await e.json();
          if (e.ok && a.success) {
            let e = n ? t : i;
            (S({ orderId: a.orderId, amount: R, address: e }), M([]));
          } else
            alert(a.error || `Failed to place COD order. Please try again.`);
        } catch {
          alert(`Network error. Please try again.`);
        } finally {
          I(!1);
        }
      }
    };
  return N
    ? (0, G.jsx)(`div`, {
        style: {
          padding: `120px 20px`,
          textAlign: `center`,
          fontFamily: `sans-serif`,
          color: `#666`,
        },
        children: `Loading cart...`,
      })
    : (0, G.jsxs)(G.Fragment, {
        children: [
          (0, G.jsx)(`style`, {
            children: `
        .cart-page-container { max-width: 1200px; margin: 0 auto; padding: 60px 20px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1c1c1a; min-height: 70vh; }
        .cart-top-nav { margin-bottom: 20px; }
        .back-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #7c7c75; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; transition: color 0.2s; background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; }
        .back-btn:hover { color: #1c1c1a; }
        .cart-page-title { font-family: 'Cormorant Garamond', 'Playfair Display', serif; font-size: 2.5rem; font-weight: 500; margin-bottom: 30px; border-bottom: 1px solid #ebebeb; padding-bottom: 15px; }
        .cart-page-layout { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; align-items: start; }
        .checkout-layout { display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start; }
        .cart-items-section { display: flex; flex-direction: column; }
        .cart-table-header { display: grid; grid-template-columns: 120px 1fr 100px; padding: 10px 0; border-bottom: 1px solid #ebebeb; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #7c7c75; font-weight: 600; }
        .cart-page-item-row { display: grid; grid-template-columns: 120px 1fr 100px; gap: 20px; padding: 25px 0; border-bottom: 1px solid #f5f5f5; }
        .cart-page-item-img { width: 120px; aspect-ratio: 1/1; background: #f9f9f9; border-radius: 8px; overflow: hidden; }
        .cart-page-item-img img { width: 100%; height: 100%; object-fit: cover; }
        .cart-page-item-details { display: flex; flex-direction: column; justify-content: space-between; }
        .cart-page-item-name { font-size: 15px; font-weight: 500; line-height: 1.4; }
        .cart-page-item-meta { font-size: 11px; color: #7c7c75; margin-top: 6px; text-transform: uppercase; }
        .cart-page-item-actions { display: flex; align-items: center; gap: 16px; margin-top: 15px; }
        .cart-page-qty { display: flex; align-items: center; border: 1px solid #ddddd8; border-radius: 4px; height: 30px; }
        .cart-page-qty-btn { background: none; border: none; width: 30px; height: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #3d3d3a; }
        .cart-page-qty-val { font-size: 13px; font-weight: 500; width: 25px; text-align: center; }
        .cart-page-remove-btn { background: none; border: none; color: #ef4444; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 12px; opacity: 0.8; }
        .cart-page-remove-btn:hover { opacity: 1; }
        .cart-page-price-col { text-align: right; font-size: 16px; font-weight: 500; }
        .cart-summary-panel { background: #fafaf7; border: 1px solid #ebebeb; border-radius: 12px; padding: 28px; position: sticky; top: 100px; }
        .cart-summary-title { font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; border-bottom: 1px solid #ebebeb; padding-bottom: 10px; }
        .cart-note-box { margin-bottom: 22px; }
        .cart-note-box label { display: block; font-size: 12px; font-weight: 500; margin-bottom: 8px; color: #3d3d3a; }
        .cart-page-textarea { width: 100%; padding: 12px; border: 1px solid #ddddd8; border-radius: 6px; font-size: 13px; resize: none; outline: none; font-family: inherit; box-sizing: border-box; }
        .cart-page-textarea:focus { border-color: #1c1c1a; }
        .cart-totals-box { border-top: 1px solid #ebebeb; padding-top: 18px; margin-bottom: 20px; }
        .cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 13px; }
        .cart-total-row.subtotal { font-size: 18px; font-weight: 600; margin-top: 10px; }
        .cart-checkout-btn { width: 100%; background: #1c1c1a; color: #fff; border: none; padding: 15px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background 0.2s; font-family: inherit; }
        .cart-checkout-btn:hover:not(:disabled) { background: #3d3d3a; }
        .cart-checkout-btn:disabled { background: #ccc; cursor: not-allowed; }
        .cart-security-badge { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 12px; color: #7c7c75; margin-top: 15px; }
        .cart-payment-options { display: flex; flex-direction: column; gap: 10px; }
        .cart-cod-btn { width: 100%; background: #fff; color: #1c1c1a; border: 2px solid #1c1c1a; padding: 14px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background 0.2s, color 0.2s; font-family: inherit; }
        .cart-cod-btn:hover:not(:disabled) { background: #f5f5f5; }
        .cart-cod-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .cart-payment-divider { display: flex; align-items: center; gap: 10px; font-size: 11px; color: #bbb; text-transform: uppercase; letter-spacing: 0.06em; }
        .cart-payment-divider::before, .cart-payment-divider::after { content: ''; flex: 1; height: 1px; background: #ebebeb; }

        /* ── COD Success Modal ───────────────────────────────────── */
        .cod-modal-overlay {
          position: fixed; inset: 0; z-index: 99999;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: codFadeIn 0.2s ease;
        }
        @keyframes codFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .cod-modal-box {
          background: #fff; border-radius: 20px;
          max-width: 420px; width: 100%;
          padding: 0; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.2);
          animation: codSlideUp 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        @keyframes codSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .cod-modal-header {
          background: linear-gradient(135deg, #1c1c1a 0%, #3d3d3a 100%);
          padding: 32px 28px 28px;
          text-align: center;
        }
        .cod-success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px; border: 2px solid rgba(255,255,255,0.25);
        }
        .cod-modal-title {
          color: #fff; font-family: 'Cormorant Garamond','Playfair Display',serif;
          font-size: 1.8rem; font-weight: 500; margin: 0 0 6px;
        }
        .cod-modal-subtitle { color: rgba(255,255,255,0.65); font-size: 13px; margin: 0; }
        .cod-modal-body { padding: 24px 28px; }
        .cod-info-row {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 0; border-bottom: 1px solid #f5f5f5;
        }
        .cod-info-row:last-of-type { border-bottom: none; }
        .cod-info-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: #fafaf7; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0; color: #8b7355;
        }
        .cod-info-label { font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
        .cod-info-value { font-size: 14px; font-weight: 600; color: #1c1c1a; }
        .cod-amount-value { font-size: 18px; color: #1c1c1a; }
        .cod-modal-actions { padding: 0 28px 28px; display: flex; flex-direction: column; gap: 10px; }
        .cod-primary-btn {
          width: 100%; padding: 14px; background: #1c1c1a; color: #fff;
          border: none; border-radius: 10px; font-size: 13px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
          font-family: inherit; transition: background 0.2s;
        }
        .cod-primary-btn:hover { background: #3d3d3a; }
        .cod-secondary-btn {
          width: 100%; padding: 13px; background: transparent; color: #555;
          border: 1.5px solid #e0e0e0; border-radius: 10px; font-size: 13px;
          font-weight: 600; letter-spacing: 0.04em; cursor: pointer;
          font-family: inherit; transition: border-color 0.2s, color 0.2s;
        }
        .cod-secondary-btn:hover { border-color: #1c1c1a; color: #1c1c1a; }
        @media (max-width: 480px) {
          .cod-modal-box { border-radius: 16px; }
          .cod-modal-header { padding: 28px 20px 24px; }
          .cod-modal-body { padding: 20px; }
          .cod-modal-actions { padding: 0 20px 24px; }
        }
        .addr-section-heading { font-size: 18px; font-weight: 600; color: #1c1c1a; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        .cart-page-empty { text-align: center; padding: 80px 20px; }
        .cart-page-empty-icon { width: 80px; height: 80px; background: #fafaf7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: #8b7355; }
        .cart-page-empty h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; margin-bottom: 10px; }
        .cart-page-empty p { color: #7c7c75; font-size: 14px; margin-bottom: 30px; }
        .cart-back-shopping-btn { background: #1c1c1a; color: #fff; border: none; padding: 14px 36px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .checkout-steps { display: flex; align-items: center; gap: 8px; font-size: 12px; margin-bottom: 24px; color: #aaa; }
        .checkout-steps .step-active { color: #1c1c1a; font-weight: 600; }
        @media (max-width: 900px) {
          .cart-page-layout, .checkout-layout { grid-template-columns: 1fr; gap: 24px; }
          .cart-summary-panel { position: static; }
          .cart-page-container { padding: 30px 20px; }
          /* On tablet/mobile show Order Summary ABOVE the address list */
          .checkout-layout { display: flex; flex-direction: column; }
          .checkout-layout > div:first-child { order: 2; }
          .cart-summary-panel { order: 1; }
        }
        @media (max-width: 600px) {
          .cart-page-container { padding: 20px 14px 60px; }
          .cart-page-title { font-size: 1.8rem; }
          .cart-table-header { display: none; }
          .cart-page-item-row { grid-template-columns: 72px 1fr; gap: 12px; padding: 16px 0; }
          .cart-page-item-img { width: 72px; }
          .cart-page-price-col { display: none; }
          .cart-page-item-name { font-size: 13px; }
          .cart-page-item-actions { flex-wrap: wrap; gap: 10px; }
          .addr-section-heading { font-size: 15px !important; margin-bottom: 14px !important; }
          .cart-summary-panel { padding: 16px; border-radius: 10px; }
          .cart-summary-title { font-size: 12px; margin-bottom: 14px; padding-bottom: 8px; }
          .checkout-steps { font-size: 10px; gap: 5px; flex-wrap: wrap; margin-bottom: 18px; }
          .cart-checkout-btn { padding: 13px 10px; font-size: 12px; }
          .cart-cod-btn { padding: 12px 10px; font-size: 12px; }
          .cart-security-badge { font-size: 11px; gap: 6px; }
          .cart-total-row.subtotal { font-size: 15px; }
        }
        @media (max-width: 420px) {
          .cart-page-title { font-size: 1.5rem; }
          .cart-page-empty { padding: 60px 14px; }
          .cart-page-empty h2 { font-size: 1.7rem; }
          .auth-option-btn { padding: 14px !important; gap: 12px !important; }
          .auth-option-icon { width: 36px !important; height: 36px !important; }
          .auth-option-title { font-size: 13px !important; }
          .auth-option-sub { font-size: 11px !important; }
          .cart-summary-panel { padding: 14px 12px; }
          .cart-page-container { padding: 16px 12px 60px; }
        }
      `,
          }),
          (0, G.jsx)(`div`, {
            className: `cart-page-container`,
            children:
              k.length === 0
                ? (0, G.jsxs)(`div`, {
                    className: `cart-page-empty`,
                    children: [
                      (0, G.jsx)(`div`, {
                        className: `cart-page-empty-icon`,
                        children: (0, G.jsx)(A, { size: 36, strokeWidth: 1.5 }),
                      }),
                      (0, G.jsx)(`h2`, { children: `Your Cart is Empty` }),
                      (0, G.jsx)(`p`, {
                        children: `Add some premium linen products to get started.`,
                      }),
                      (0, G.jsxs)(x, {
                        to: `/products`,
                        className: `cart-back-shopping-btn`,
                        children: [
                          (0, G.jsx)(ue, { size: 16 }),
                          ` Start Shopping`,
                        ],
                      }),
                    ],
                  })
                : (0, G.jsxs)(G.Fragment, {
                    children: [
                      (0, G.jsxs)(`div`, {
                        className: `checkout-steps`,
                        children: [
                          (0, G.jsx)(`span`, {
                            className: n === `cart` ? `step-active` : ``,
                            children: `Cart`,
                          }),
                          (0, G.jsx)(p, { size: 13 }),
                          (0, G.jsx)(`span`, {
                            className: [
                              `auth-gate`,
                              `guest`,
                              `address`,
                            ].includes(n)
                              ? `step-active`
                              : ``,
                            children:
                              n === `guest` ? `Guest Checkout` : `Delivery`,
                          }),
                          (0, G.jsx)(p, { size: 13 }),
                          (0, G.jsx)(`span`, { children: `Payment` }),
                        ],
                      }),
                      n === `cart` &&
                        (0, G.jsxs)(G.Fragment, {
                          children: [
                            (0, G.jsx)(`div`, {
                              className: `cart-top-nav`,
                              children: (0, G.jsxs)(x, {
                                to: `/products`,
                                className: `back-btn`,
                                children: [
                                  (0, G.jsx)(m, { size: 16 }),
                                  ` Back to Collections`,
                                ],
                              }),
                            }),
                            (0, G.jsx)(`h1`, {
                              className: `cart-page-title`,
                              children: `Shopping Cart`,
                            }),
                            (0, G.jsxs)(`div`, {
                              className: `cart-page-layout`,
                              children: [
                                (0, G.jsxs)(`div`, {
                                  className: `cart-items-section`,
                                  children: [
                                    (0, G.jsxs)(`div`, {
                                      className: `cart-table-header`,
                                      children: [
                                        (0, G.jsx)(`span`, {
                                          children: `Product`,
                                        }),
                                        (0, G.jsx)(`span`, {
                                          children: `Details`,
                                        }),
                                        (0, G.jsx)(`span`, {
                                          style: { textAlign: `right` },
                                          children: `Total`,
                                        }),
                                      ],
                                    }),
                                    k.map((e) => {
                                      let t = e._id || e.productId;
                                      return (0, G.jsxs)(
                                        `div`,
                                        {
                                          className: `cart-page-item-row`,
                                          children: [
                                            (0, G.jsx)(`div`, {
                                              className: `cart-page-item-img`,
                                              children: (0, G.jsx)(`img`, {
                                                src:
                                                  e.image ||
                                                  `https://placehold.co/300?text=?`,
                                                alt: e.name,
                                              }),
                                            }),
                                            (0, G.jsxs)(`div`, {
                                              className: `cart-page-item-details`,
                                              children: [
                                                (0, G.jsxs)(`div`, {
                                                  children: [
                                                    (0, G.jsx)(`h3`, {
                                                      className: `cart-page-item-name`,
                                                      children: e.name,
                                                    }),
                                                    e.variant &&
                                                      (0, G.jsx)(`div`, {
                                                        className: `cart-page-item-meta`,
                                                        children: e.variant,
                                                      }),
                                                    e.discountPercent > 0 &&
                                                      (0, G.jsx)(`div`, {
                                                        className: `cart-page-item-meta`,
                                                        style: { color: `#166534`, fontWeight: `600` },
                                                        children: `${e.discountPercent}% Off`,
                                                      }),
                                                  ],
                                                }),
                                                (0, G.jsxs)(`div`, {
                                                  className: `cart-page-item-actions`,
                                                  children: [
                                                    (0, G.jsxs)(`div`, {
                                                      className: `cart-page-qty`,
                                                      children: [
                                                        (0, G.jsx)(`button`, {
                                                          type: `button`,
                                                          className: `cart-page-qty-btn`,
                                                          onClick: () =>
                                                            re(
                                                              e,
                                                              e.quantity,
                                                              -1,
                                                            ),
                                                          children: (0, G.jsx)(
                                                            D,
                                                            { size: 12 },
                                                          ),
                                                        }),
                                                        (0, G.jsx)(`span`, {
                                                          className: `cart-page-qty-val`,
                                                          children: e.quantity,
                                                        }),
                                                        (0, G.jsx)(`button`, {
                                                          type: `button`,
                                                          className: `cart-page-qty-btn`,
                                                          onClick: () =>
                                                            re(
                                                              e,
                                                              e.quantity,
                                                              1,
                                                            ),
                                                          children: (0, G.jsx)(
                                                            j,
                                                            { size: 12 },
                                                          ),
                                                        }),
                                                      ],
                                                    }),
                                                    (0, G.jsxs)(`button`, {
                                                      type: `button`,
                                                      className: `cart-page-remove-btn`,
                                                      onClick: () => ie(e),
                                                      children: [
                                                        (0, G.jsx)(ae, {
                                                          size: 13,
                                                        }),
                                                        ` Remove`,
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, G.jsxs)(`div`, {
                                              className: `cart-page-price-col`,
                                              children: [
                                                `₹`,
                                                (
                                                  e.price * e.quantity
                                                ).toLocaleString(`en-IN`, {
                                                  minimumFractionDigits: 2,
                                                }),
                                              ],
                                            }),
                                          ],
                                        },
                                        t,
                                      );
                                    }),
                                  ],
                                }),
                                (0, G.jsxs)(`div`, {
                                  className: `cart-summary-panel`,
                                  children: [
                                    (0, G.jsx)(`h2`, {
                                      className: `cart-summary-title`,
                                      children: `Order Summary`,
                                    }),
                                    (0, G.jsxs)(`div`, {
                                      className: `cart-note-box`,
                                      children: [
                                        (0, G.jsx)(`label`, {
                                          children: `Special Instructions / Order Notes`,
                                        }),
                                        (0, G.jsx)(`textarea`, {
                                          className: `cart-page-textarea`,
                                          rows: 3,
                                          placeholder: `E.g. gift wrapping, leave at door...`,
                                          value: w,
                                          onChange: (e) => O(e.target.value),
                                        }),
                                      ],
                                    }),
                                    (0, G.jsxs)(`div`, {
                                      className: `cart-totals-box`,
                                      children: [
                                        (0, G.jsxs)(`div`, {
                                          className: `cart-total-row`,
                                          children: [
                                            (0, G.jsx)(`span`, {
                                              style: { color: `#7c7c75` },
                                              children: `Shipping`,
                                            }),
                                            (0, G.jsx)(`span`, {
                                              style: {
                                                color: `#166534`,
                                                fontWeight: 500,
                                              },
                                              children: `FREE`,
                                            }),
                                          ],
                                        }),
                                        (0, G.jsxs)(`div`, {
                                          className: `cart-total-row`,
                                          children: [
                                            (0, G.jsx)(`span`, {
                                              style: { color: `#7c7c75` },
                                              children: `Taxes`,
                                            }),
                                            (0, G.jsx)(`span`, {
                                              children: `Calculated at checkout`,
                                            }),
                                          ],
                                        }),
                                        (0, G.jsxs)(`div`, {
                                          className: `cart-total-row subtotal`,
                                          children: [
                                            (0, G.jsx)(`span`, {
                                              children: `Subtotal`,
                                            }),
                                            (0, G.jsxs)(`span`, {
                                              children: [
                                                `₹`,
                                                R.toLocaleString(`en-IN`, {
                                                  minimumFractionDigits: 2,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, G.jsxs)(`button`, {
                                      type: `button`,
                                      className: `cart-checkout-btn`,
                                      onClick: () => {
                                        C
                                          ? r(`address`)
                                          : (window.scrollTo({
                                              top: 0,
                                              behavior: `instant`,
                                            }),
                                            r(`auth-gate`));
                                      },
                                      children: [
                                        `Proceed to Checkout `,
                                        (0, G.jsx)(p, { size: 16 }),
                                      ],
                                    }),
                                    (0, G.jsxs)(`div`, {
                                      className: `cart-security-badge`,
                                      children: [
                                        (0, G.jsx)(ne, { size: 16 }),
                                        ` Secure SSL Encrypted Checkout`,
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      n === `address` &&
                        (0, G.jsxs)(G.Fragment, {
                          children: [
                            (0, G.jsx)(`div`, {
                              className: `cart-top-nav`,
                              children: (0, G.jsxs)(`button`, {
                                className: `back-btn`,
                                onClick: () => r(`cart`),
                                children: [
                                  (0, G.jsx)(m, { size: 16 }),
                                  ` Back to Cart`,
                                ],
                              }),
                            }),
                            (0, G.jsxs)(`div`, {
                              className: `checkout-layout`,
                              children: [
                                (0, G.jsxs)(`div`, {
                                  children: [
                                    (0, G.jsxs)(`div`, {
                                      className: `addr-section-heading`,
                                      children: [
                                        (0, G.jsx)(v, {
                                          size: 20,
                                          strokeWidth: 1.8,
                                        }),
                                        `Select Delivery Address`,
                                      ],
                                    }),
                                    (0, G.jsx)(Ie, {
                                      selectedId: i?._id,
                                      onAddressSelect: a,
                                    }),
                                  ],
                                }),
                                (0, G.jsxs)(`div`, {
                                  className: `cart-summary-panel`,
                                  children: [
                                    (0, G.jsx)(`h2`, {
                                      className: `cart-summary-title`,
                                      children: `Order Summary`,
                                    }),
                                    (0, G.jsx)(`div`, {
                                      style: { marginBottom: `18px` },
                                      children: k.map((e) =>
                                        (0, G.jsxs)(
                                          `div`,
                                          {
                                            style: {
                                              display: `flex`,
                                              justifyContent: `space-between`,
                                              alignItems: `flex-start`,
                                              fontSize: `13px`,
                                              color: `#555`,
                                              marginBottom: `8px`,
                                              gap: `10px`,
                                            },
                                            children: [
                                              (0, G.jsxs)(`span`, {
                                                style: {
                                                  flex: 1,
                                                  overflow: `hidden`,
                                                  textOverflow: `ellipsis`,
                                                  whiteSpace: `nowrap`,
                                                  minWidth: 0,
                                                  fontSize: `12px`,
                                                  lineHeight: `1.4`,
                                                },
                                                children: [
                                                  e.name,
                                                  ` × `,
                                                  e.quantity,
                                                ],
                                              }),
                                              (0, G.jsxs)(`span`, {
                                                style: {
                                                  fontWeight: `500`,
                                                  flexShrink: 0,
                                                  fontSize: `13px`,
                                                },
                                                children: [
                                                  `₹`,
                                                  (
                                                    e.price * e.quantity
                                                  ).toLocaleString(`en-IN`),
                                                ],
                                              }),
                                            ],
                                          },
                                          e._id || e.productId,
                                        ),
                                      ),
                                    }),
                                    (0, G.jsxs)(`div`, {
                                      className: `cart-totals-box`,
                                      children: [
                                        (0, G.jsxs)(`div`, {
                                          className: `cart-total-row`,
                                          children: [
                                            (0, G.jsx)(`span`, {
                                              style: { color: `#7c7c75` },
                                              children: `Shipping`,
                                            }),
                                            (0, G.jsx)(`span`, {
                                              style: {
                                                color: `#166534`,
                                                fontWeight: 500,
                                              },
                                              children: `FREE`,
                                            }),
                                          ],
                                        }),
                                        (0, G.jsxs)(`div`, {
                                          className: `cart-total-row subtotal`,
                                          children: [
                                            (0, G.jsx)(`span`, {
                                              children: `Total`,
                                            }),
                                            (0, G.jsxs)(`span`, {
                                              children: [
                                                `₹`,
                                                R.toLocaleString(`en-IN`, {
                                                  minimumFractionDigits: 2,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, G.jsxs)(`div`, {
                                      style: { marginBottom: `18px` },
                                      children: [
                                        (0, G.jsx)(`div`, {
                                          style: {
                                            fontSize: `11px`,
                                            fontWeight: `600`,
                                            textTransform: `uppercase`,
                                            letterSpacing: `0.07em`,
                                            color: `#888`,
                                            marginBottom: `8px`,
                                          },
                                          children: `Delivering To`,
                                        }),
                                        (0, G.jsx)(
                                          () =>
                                            i
                                              ? (0, G.jsxs)(`div`, {
                                                  style: {
                                                    padding: `12px 14px`,
                                                    background: `#fafaf7`,
                                                    border: `1px solid #e8e8e8`,
                                                    borderRadius: `8px`,
                                                    fontSize: `12px`,
                                                    color: `#444`,
                                                    lineHeight: `1.7`,
                                                  },
                                                  children: [
                                                    (0, G.jsxs)(`div`, {
                                                      style: {
                                                        fontWeight: `600`,
                                                        fontSize: `13px`,
                                                        color: `#1c1c1a`,
                                                        marginBottom: `4px`,
                                                      },
                                                      children: [
                                                        i.fullName,
                                                        (0, G.jsx)(`span`, {
                                                          style: {
                                                            marginLeft: `8px`,
                                                            fontSize: `10px`,
                                                            background: `#f0ece6`,
                                                            color: `#8b7355`,
                                                            padding: `1px 7px`,
                                                            borderRadius: `10px`,
                                                            fontWeight: `700`,
                                                            textTransform: `uppercase`,
                                                          },
                                                          children:
                                                            i.addressType,
                                                        }),
                                                      ],
                                                    }),
                                                    (0, G.jsx)(`div`, {
                                                      children: i.mobile,
                                                    }),
                                                    (0, G.jsxs)(`div`, {
                                                      children: [
                                                        i.houseNo,
                                                        `, `,
                                                        i.street,
                                                        i.landmark
                                                          ? `, ${i.landmark}`
                                                          : ``,
                                                      ],
                                                    }),
                                                    (0, G.jsxs)(`div`, {
                                                      children: [
                                                        i.city,
                                                        `, `,
                                                        i.state,
                                                        ` — `,
                                                        i.pincode,
                                                      ],
                                                    }),
                                                  ],
                                                })
                                              : (0, G.jsx)(`div`, {
                                                  style: {
                                                    padding: `12px 14px`,
                                                    background: `#fff8f0`,
                                                    border: `1px dashed #f5c6a0`,
                                                    borderRadius: `8px`,
                                                    fontSize: `12px`,
                                                    color: `#a0522d`,
                                                  },
                                                  children: `No address selected. Choose one from the list.`,
                                                }),
                                          {},
                                        ),
                                      ],
                                    }),
                                    (0, G.jsxs)(`div`, {
                                      className: `cart-payment-options`,
                                      children: [
                                        (0, G.jsxs)(`button`, {
                                          type: `button`,
                                          className: `cart-checkout-btn`,
                                          onClick: () => z(),
                                          disabled: !i || F,
                                          children: [
                                            (0, G.jsx)(t, { size: 16 }),
                                            F
                                              ? `Processing...`
                                              : `Pay Online (Razorpay / UPI)`,
                                          ],
                                        }),
                                        (0, G.jsx)(`div`, {
                                          className: `cart-payment-divider`,
                                          children: `or`,
                                        }),
                                        (0, G.jsxs)(`button`, {
                                          type: `button`,
                                          className: `cart-cod-btn`,
                                          onClick: () => oe(),
                                          disabled: !i || F,
                                          children: [
                                            (0, G.jsx)(te, { size: 16 }),
                                            F
                                              ? `Placing...`
                                              : `Cash on Delivery`,
                                          ],
                                        }),
                                      ],
                                    }),
                                    !i &&
                                      (0, G.jsx)(`p`, {
                                        style: {
                                          textAlign: `center`,
                                          fontSize: `12px`,
                                          color: `#e65100`,
                                          marginTop: `10px`,
                                        },
                                        children: `Please select a delivery address to continue.`,
                                      }),
                                    (0, G.jsxs)(`div`, {
                                      className: `cart-security-badge`,
                                      children: [
                                        (0, G.jsx)(ne, { size: 16 }),
                                        ` Secure SSL Encrypted Checkout`,
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      n === `auth-gate` &&
                        (0, G.jsxs)(G.Fragment, {
                          children: [
                            (0, G.jsx)(`div`, {
                              className: `cart-top-nav`,
                              children: (0, G.jsxs)(`button`, {
                                className: `back-btn`,
                                onClick: () => {
                                  (r(`cart`), g(!1));
                                },
                                children: [
                                  (0, G.jsx)(m, { size: 16 }),
                                  ` Back to Cart`,
                                ],
                              }),
                            }),
                            h
                              ? (0, G.jsxs)(`div`, {
                                  style: {
                                    maxWidth: `480px`,
                                    margin: `0 auto`,
                                  },
                                  children: [
                                    (0, G.jsx)(`h2`, {
                                      style: {
                                        fontFamily: `serif`,
                                        fontWeight: 500,
                                        fontSize: `22px`,
                                        marginBottom: `20px`,
                                        color: `#1c1c1a`,
                                      },
                                      children: `Login to Continue`,
                                    }),
                                    (0, G.jsx)(be, {
                                      onSuccess: () => window.location.reload(),
                                    }),
                                  ],
                                })
                              : (0, G.jsxs)(`div`, {
                                  style: {
                                    maxWidth: `480px`,
                                    margin: `0 auto`,
                                  },
                                  children: [
                                    (0, G.jsx)(`h2`, {
                                      style: {
                                        fontFamily: `serif`,
                                        fontWeight: 500,
                                        fontSize: `22px`,
                                        marginBottom: `8px`,
                                        color: `#1c1c1a`,
                                      },
                                      children: `How would you like to checkout?`,
                                    }),
                                    (0, G.jsx)(`p`, {
                                      style: {
                                        color: `#888`,
                                        fontSize: `13px`,
                                        marginBottom: `28px`,
                                      },
                                      children: `Login for saved addresses and order history, or checkout as a guest with just your mobile number.`,
                                    }),
                                    (0, G.jsxs)(`div`, {
                                      style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: `14px`,
                                      },
                                      children: [
                                        (0, G.jsxs)(`button`, {
                                          className: `auth-option-btn`,
                                          onClick: () => r(`guest`),
                                          style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: `16px`,
                                            padding: `18px 20px`,
                                            border: `2px solid #1c1c1a`,
                                            borderRadius: `10px`,
                                            background: `#1c1c1a`,
                                            color: `#fff`,
                                            cursor: `pointer`,
                                            textAlign: `left`,
                                            fontFamily: `inherit`,
                                            width: `100%`,
                                            boxSizing: `border-box`,
                                          },
                                          children: [
                                            (0, G.jsx)(`div`, {
                                              className: `auth-option-icon`,
                                              style: {
                                                width: `42px`,
                                                height: `42px`,
                                                borderRadius: `50%`,
                                                background: `rgba(255,255,255,0.15)`,
                                                display: `flex`,
                                                alignItems: `center`,
                                                justifyContent: `center`,
                                                flexShrink: 0,
                                              },
                                              children: (0, G.jsx)(T, {
                                                size: 18,
                                              }),
                                            }),
                                            (0, G.jsxs)(`div`, {
                                              style: { minWidth: 0 },
                                              children: [
                                                (0, G.jsx)(`div`, {
                                                  className: `auth-option-title`,
                                                  style: {
                                                    fontWeight: `700`,
                                                    fontSize: `14px`,
                                                    marginBottom: `2px`,
                                                  },
                                                  children: `Continue as Guest`,
                                                }),
                                                (0, G.jsx)(`div`, {
                                                  className: `auth-option-sub`,
                                                  style: {
                                                    fontSize: `12px`,
                                                    opacity: 0.7,
                                                  },
                                                  children: `Verify with OTP — no account needed`,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, G.jsxs)(`button`, {
                                          className: `auth-option-btn`,
                                          onClick: () => g(!0),
                                          style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: `16px`,
                                            padding: `18px 20px`,
                                            border: `2px solid #e0e0e0`,
                                            borderRadius: `10px`,
                                            background: `#fff`,
                                            color: `#1c1c1a`,
                                            cursor: `pointer`,
                                            textAlign: `left`,
                                            fontFamily: `inherit`,
                                            width: `100%`,
                                            boxSizing: `border-box`,
                                          },
                                          children: [
                                            (0, G.jsx)(`div`, {
                                              className: `auth-option-icon`,
                                              style: {
                                                width: `42px`,
                                                height: `42px`,
                                                borderRadius: `50%`,
                                                background: `#f5f5f5`,
                                                display: `flex`,
                                                alignItems: `center`,
                                                justifyContent: `center`,
                                                flexShrink: 0,
                                              },
                                              children: (0, G.jsx)(E, {
                                                size: 18,
                                              }),
                                            }),
                                            (0, G.jsxs)(`div`, {
                                              style: { minWidth: 0 },
                                              children: [
                                                (0, G.jsx)(`div`, {
                                                  className: `auth-option-title`,
                                                  style: {
                                                    fontWeight: `700`,
                                                    fontSize: `14px`,
                                                    marginBottom: `2px`,
                                                  },
                                                  children: `Login / Register`,
                                                }),
                                                (0, G.jsx)(`div`, {
                                                  className: `auth-option-sub`,
                                                  style: {
                                                    fontSize: `12px`,
                                                    color: `#888`,
                                                  },
                                                  children: `Saved addresses · Order history · Faster checkout`,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                          ],
                        }),
                      n === `guest` &&
                        (0, G.jsxs)(G.Fragment, {
                          children: [
                            (0, G.jsx)(`div`, {
                              className: `cart-top-nav`,
                              children: (0, G.jsxs)(`button`, {
                                className: `back-btn`,
                                onClick: () => r(`auth-gate`),
                                children: [
                                  (0, G.jsx)(m, { size: 16 }),
                                  ` Back`,
                                ],
                              }),
                            }),
                            (0, G.jsxs)(`div`, {
                              className: `checkout-layout`,
                              children: [
                                (0, G.jsxs)(`div`, {
                                  children: [
                                    (0, G.jsxs)(`div`, {
                                      className: `addr-section-heading`,
                                      children: [
                                        (0, G.jsx)(T, {
                                          size: 20,
                                          strokeWidth: 1.8,
                                        }),
                                        `Guest Checkout`,
                                      ],
                                    }),
                                    (0, G.jsx)(Ce, {
                                      onComplete: (e, t, n) => {
                                        (s(e), l(t), f(n), y(!0));
                                      },
                                      onSwitchToLogin: () => {
                                        (r(`auth-gate`), g(!0));
                                      },
                                      readyToPay: _,
                                    }),
                                  ],
                                }),
                                (0, G.jsxs)(`div`, {
                                  className: `cart-summary-panel`,
                                  children: [
                                    (0, G.jsx)(`h2`, {
                                      className: `cart-summary-title`,
                                      children: `Order Summary`,
                                    }),
                                    k.map((e) =>
                                      (0, G.jsxs)(
                                        `div`,
                                        {
                                          style: {
                                            display: `flex`,
                                            justifyContent: `space-between`,
                                            fontSize: `13px`,
                                            color: `#555`,
                                            marginBottom: `8px`,
                                            gap: `10px`,
                                          },
                                          children: [
                                            (0, G.jsxs)(`span`, {
                                              style: {
                                                flex: 1,
                                                overflow: `hidden`,
                                                textOverflow: `ellipsis`,
                                                whiteSpace: `nowrap`,
                                              },
                                              children: [
                                                e.name,
                                                ` × `,
                                                e.quantity,
                                              ],
                                            }),
                                            (0, G.jsxs)(`span`, {
                                              style: {
                                                fontWeight: `500`,
                                                flexShrink: 0,
                                              },
                                              children: [
                                                `₹`,
                                                (
                                                  e.price * e.quantity
                                                ).toLocaleString(`en-IN`),
                                              ],
                                            }),
                                          ],
                                        },
                                        e._id || e.productId,
                                      ),
                                    ),
                                    (0, G.jsxs)(`div`, {
                                      className: `cart-totals-box`,
                                      children: [
                                        (0, G.jsxs)(`div`, {
                                          className: `cart-total-row`,
                                          children: [
                                            (0, G.jsx)(`span`, {
                                              style: { color: `#7c7c75` },
                                              children: `Shipping`,
                                            }),
                                            (0, G.jsx)(`span`, {
                                              style: {
                                                color: `#166534`,
                                                fontWeight: 500,
                                              },
                                              children: `FREE`,
                                            }),
                                          ],
                                        }),
                                        (0, G.jsxs)(`div`, {
                                          className: `cart-total-row subtotal`,
                                          children: [
                                            (0, G.jsx)(`span`, {
                                              children: `Total`,
                                            }),
                                            (0, G.jsxs)(`span`, {
                                              children: [
                                                `₹`,
                                                R.toLocaleString(`en-IN`, {
                                                  minimumFractionDigits: 2,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    _
                                      ? (0, G.jsxs)(`div`, {
                                          className: `cart-payment-options`,
                                          children: [
                                            (0, G.jsxs)(`button`, {
                                              type: `button`,
                                              className: `cart-checkout-btn`,
                                              onClick: () => z(o, u),
                                              disabled: F,
                                              children: [
                                                (0, G.jsx)(t, { size: 16 }),
                                                F
                                                  ? `Processing...`
                                                  : `Pay Online (Razorpay / UPI)`,
                                              ],
                                            }),
                                            (0, G.jsx)(`div`, {
                                              className: `cart-payment-divider`,
                                              children: `or`,
                                            }),
                                            (0, G.jsxs)(`button`, {
                                              type: `button`,
                                              className: `cart-cod-btn`,
                                              onClick: () => oe(o, u),
                                              disabled: F,
                                              children: [
                                                (0, G.jsx)(te, { size: 16 }),
                                                F
                                                  ? `Placing...`
                                                  : `Cash on Delivery`,
                                              ],
                                            }),
                                          ],
                                        })
                                      : (0, G.jsx)(`div`, {
                                          style: {
                                            padding: `12px`,
                                            background: `#fafaf7`,
                                            border: `1px dashed #ddd`,
                                            borderRadius: `8px`,
                                            fontSize: `12px`,
                                            color: `#888`,
                                            textAlign: `center`,
                                          },
                                          children: `Complete your details above to choose payment method`,
                                        }),
                                    (0, G.jsxs)(`div`, {
                                      className: `cart-security-badge`,
                                      children: [
                                        (0, G.jsx)(ne, { size: 16 }),
                                        ` Secure SSL Encrypted Checkout`,
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
          }),
          b &&
            (0, G.jsx)(`div`, {
              className: `cod-modal-overlay`,
              children: (0, G.jsxs)(`div`, {
                className: `cod-modal-box`,
                children: [
                  (0, G.jsxs)(`div`, {
                    className: `cod-modal-header`,
                    children: [
                      (0, G.jsx)(`div`, {
                        className: `cod-success-icon`,
                        children: (0, G.jsx)(ee, {
                          size: 30,
                          color: `#fff`,
                          strokeWidth: 1.8,
                        }),
                      }),
                      (0, G.jsx)(`h2`, {
                        className: `cod-modal-title`,
                        children: `Order Confirmed!`,
                      }),
                      (0, G.jsx)(`p`, {
                        className: `cod-modal-subtitle`,
                        children: `Your order has been placed successfully`,
                      }),
                    ],
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `cod-modal-body`,
                    children: [
                      (0, G.jsxs)(`div`, {
                        className: `cod-info-row`,
                        children: [
                          (0, G.jsx)(`div`, {
                            className: `cod-info-icon`,
                            children: (0, G.jsx)(le, {
                              size: 18,
                              strokeWidth: 1.8,
                            }),
                          }),
                          (0, G.jsxs)(`div`, {
                            children: [
                              (0, G.jsx)(`div`, {
                                className: `cod-info-label`,
                                children: `Order ID`,
                              }),
                              (0, G.jsxs)(`div`, {
                                className: `cod-info-value`,
                                style: {
                                  fontSize: `12px`,
                                  letterSpacing: `0.03em`,
                                },
                                children: [
                                  `#`,
                                  String(b.orderId).slice(-10).toUpperCase(),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, G.jsxs)(`div`, {
                        className: `cod-info-row`,
                        children: [
                          (0, G.jsx)(`div`, {
                            className: `cod-info-icon`,
                            children: (0, G.jsx)(`span`, {
                              style: { fontSize: `16px`, fontWeight: `700` },
                              children: `₹`,
                            }),
                          }),
                          (0, G.jsxs)(`div`, {
                            children: [
                              (0, G.jsx)(`div`, {
                                className: `cod-info-label`,
                                children: `Amount Payable on Delivery`,
                              }),
                              (0, G.jsxs)(`div`, {
                                className: `cod-info-value cod-amount-value`,
                                children: [
                                  `₹`,
                                  b.amount.toLocaleString(`en-IN`, {
                                    minimumFractionDigits: 2,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      b.address &&
                        (0, G.jsxs)(`div`, {
                          className: `cod-info-row`,
                          children: [
                            (0, G.jsx)(`div`, {
                              className: `cod-info-icon`,
                              children: (0, G.jsx)(v, {
                                size: 18,
                                strokeWidth: 1.8,
                              }),
                            }),
                            (0, G.jsxs)(`div`, {
                              children: [
                                (0, G.jsx)(`div`, {
                                  className: `cod-info-label`,
                                  children: `Delivering To`,
                                }),
                                (0, G.jsx)(`div`, {
                                  className: `cod-info-value`,
                                  children: b.address.fullName,
                                }),
                                (0, G.jsxs)(`div`, {
                                  style: {
                                    fontSize: `12px`,
                                    color: `#888`,
                                    marginTop: `2px`,
                                    lineHeight: `1.5`,
                                  },
                                  children: [
                                    b.address.houseNo,
                                    `, `,
                                    b.address.street,
                                    `,`,
                                    (0, G.jsx)(`br`, {}),
                                    b.address.city,
                                    `, `,
                                    b.address.state,
                                    ` — `,
                                    b.address.pincode,
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      (0, G.jsxs)(`div`, {
                        style: {
                          marginTop: `16px`,
                          padding: `12px 14px`,
                          background: `#fffbf0`,
                          border: `1px solid #fde68a`,
                          borderRadius: `10px`,
                          display: `flex`,
                          gap: `10px`,
                          alignItems: `flex-start`,
                        },
                        children: [
                          (0, G.jsx)(te, {
                            size: 16,
                            color: `#b45309`,
                            style: { flexShrink: 0, marginTop: `1px` },
                          }),
                          (0, G.jsxs)(`p`, {
                            style: {
                              margin: 0,
                              fontSize: `12px`,
                              color: `#92400e`,
                              lineHeight: `1.6`,
                            },
                            children: [
                              `Please keep `,
                              (0, G.jsxs)(`strong`, {
                                children: [
                                  `₹`,
                                  b.amount.toLocaleString(`en-IN`),
                                ],
                              }),
                              ` ready at the time of delivery. Our delivery partner will collect the amount.`,
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `cod-modal-actions`,
                    children: [
                      (0, G.jsx)(`button`, {
                        className: `cod-primary-btn`,
                        onClick: () => {
                          (S(null), e(`/orders`));
                        },
                        children: `View My Orders`,
                      }),
                      (0, G.jsx)(`button`, {
                        className: `cod-secondary-btn`,
                        onClick: () => {
                          (S(null), e(`/products`));
                        },
                        children: `Continue Shopping`,
                      }),
                    ],
                  }),
                ],
              }),
            }),
        ],
      });
}
function Re({ product: e }) {
  let [t, n] = (0, B.useState)(!1),
    [r, i] = (0, B.useState)(!1);
  return (0, G.jsxs)(x, {
    to: `/product/${e._id}`,
    className: `arrival-item-card`,
    children: [
      (0, G.jsx)(`span`, { className: `arrival-tag-overlay`, children: `New` }),
      (0, G.jsx)(`div`, {
        className: `arrival-img-frame`,
        children: (0, G.jsx)(`img`, {
          src: e.image || `https://placehold.co/500x500?text=Premium+Linen`,
          alt: e.name,
        }),
      }),
      (0, G.jsxs)(`div`, {
        className: `arrival-card-details`,
        children: [
          (0, G.jsx)(`div`, {
            className: `arrival-card-category`,
            children: e.category || `Linen Elite`,
          }),
          (0, G.jsx)(`h3`, {
            className: `arrival-card-name`,
            children: e.name,
          }),
          (0, G.jsxs)(`div`, {
            className: `arrival-price-matrix`,
            children: [
              (0, G.jsxs)(`span`, {
                className: `arrival-price-active`,
                children: [
                  `₹`,
                  (e.discountPrice || e.price).toLocaleString(`en-IN`),
                ],
              }),
              e.discountPrice &&
                (0, G.jsxs)(`span`, {
                  className: `arrival-price-crossed`,
                  children: [`₹`, e.price.toLocaleString(`en-IN`)],
                }),
            ],
          }),
          (0, G.jsx)(`button`, {
            className: `arrival-add-cart-btn`,
            onClick: async (r) => {
              if ((r.preventDefault(), r.stopPropagation(), e.stock === 0 || t))
                return;
              let a = localStorage.getItem(`token`);
              if (!a) {
                (he(e, 1), i(!0), setTimeout(() => i(!1), 1500));
                return;
              }
              n(!0);
              try {
                if (
                  !(
                    await fetch(`/api/index.php/cart/add`, {
                      method: `POST`,
                      headers: {
                        "Content-Type": `application/json`,
                        Authorization: `Bearer ${a}`,
                      },
                      body: JSON.stringify({ productId: e._id, quantity: 1 }),
                    })
                  ).ok
                )
                  throw Error(`Failed to add to cart`);
                (i(!0), setTimeout(() => i(!1), 1500));
              } catch {
              } finally {
                n(!1);
              }
            },
            disabled: e.stock === 0 || t,
            children:
              e.stock === 0
                ? `Out of Stock`
                : t
                  ? `Adding…`
                  : r
                    ? `Added ✓`
                    : `Add to Cart`,
          }),
        ],
      }),
    ],
  });
}
function ze({ products: e }) {
  let [t, n] = (0, B.useState)(e || []),
    [r, a] = (0, B.useState)(!e),
    [o, s] = (0, B.useState)(``);
  (0, B.useEffect)(() => {
    e ||
      (async () => {
        try {
          let e = await fetch(`${H}/products?v=nocache`),
            t = await e.json();
          e.ok
            ? n(t.products || t)
            : s(t.message || `Failed to populate product listings.`);
        } catch (e) {
          (console.error(`Error connecting to inventory backend:`, e),
            s(`Could not establish database connection stream.`));
        } finally {
          a(!1);
        }
      })();
  }, [e]);
  let c = [...t]
    .sort((e, t) => new Date(t.createdAt || 0) - new Date(e.createdAt || 0))
    .slice(0, 8);
  return r
    ? (0, G.jsx)(`div`, {
        style: {
          padding: `120px 20px`,
          textAlign: `center`,
          fontFamily: `sans-serif`,
          color: `#7c7c75`,
        },
        children: (0, G.jsx)(`h3`, {
          children: `Revealing our newest premium releases...`,
        }),
      })
    : (0, G.jsxs)(G.Fragment, {
        children: [
          (0, G.jsx)(`style`, {
            children: `
        .arrivals-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px 80px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1c1c1a;
        }

        /* Luxury Internal Breadcrumb Trail Navigation */
        .arrivals-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #bcbcb8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 30px;
        }
        .arrivals-breadcrumb a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .arrivals-breadcrumb a:hover {
          color: #1c1c1a;
        }

        /* Editorial Header Section Formatting */
        .arrivals-editorial-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 50px;
          padding: 20px 0;
        }

        .arrivals-badge-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8b7355;
          font-weight: 600;
          margin-bottom: 12px;
          background: #fafaf7;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid #ebebeb;
        }

        .arrivals-main-heading {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 2.8rem;
          font-weight: 500;
          line-height: 1.2;
          color: #1c1c1a;
          margin: 0 0 14px 0;
          letter-spacing: -0.02em;
        }

        .arrivals-sub-paragraph {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: #7c7c75;
          line-height: 1.6;
          margin: 0;
          font-weight: 400;
        }

        /* Structural Product Showcase Card Grid */
        .arrivals-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 40px 30px;
        }

        .arrival-item-card {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .arrival-tag-overlay {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ffffff;
          color: #1c1c1a;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 5px 10px;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #ebebeb;
          z-index: 5;
        }

        .arrival-img-frame {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #fafaf7;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #ebebeb;
          position: relative;
        }

        .arrival-img-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .arrival-item-card:hover .arrival-img-frame img {
          transform: scale(1.04);
        }

        .arrival-card-details {
          padding: 16px 4px 0;
        }

        .arrival-card-category {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #bcbcb8;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .arrival-card-name {
          font-size: 15px;
          font-weight: 500;
          margin: 0 0 8px 0;
          color: #1c1c1a;
          line-height: 1.4;
        }

        .arrival-price-matrix {
          display: flex;
          gap: 10px;
          align-items: baseline;
          font-size: 14px;
        }

        .arrival-price-active {
          color: #1c1c1a;
          font-weight: 600;
        }

        .arrival-price-crossed {
          color: #bcbcb8;
          text-decoration: line-through;
          font-size: 13px;
        }
        .arrival-add-cart-btn {
          margin-top: 12px; width: 100%; padding: 10px 12px;
          background: #1c1c1a; color: #fff; border: 1px solid #1c1c1a;
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s ease, color 0.2s ease;
        }
        .arrival-add-cart-btn:hover:not(:disabled) { background: #fff; color: #1c1c1a; }
        .arrival-add-cart-btn:disabled { background: #ddddd8; color: #9ca3af; border-color: #ddddd8; cursor: not-allowed; }

        .empty-arrivals-view {
          text-align: center;
          padding: 80px 20px;
          color: #7c7c75;
          background: #fafaf7;
          border-radius: 16px;
          border: 1px dashed #ddddd8;
        }

        @media (max-width: 768px) {
          .arrivals-main-heading { font-size: 2.2rem; }
          .arrivals-products-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 25px; }
        }
      `,
          }),
          (0, G.jsxs)(`div`, {
            className: `arrivals-container`,
            children: [
              (0, G.jsxs)(`div`, {
                className: `arrivals-breadcrumb`,
                children: [
                  (0, G.jsx)(x, {
                    to: `/`,
                    children: (0, G.jsx)(i, {
                      size: 12,
                      style: { marginBottom: -1 },
                    }),
                  }),
                  (0, G.jsx)(p, { size: 10 }),
                  (0, G.jsx)(x, { to: `/products`, children: `Shop` }),
                  (0, G.jsx)(p, { size: 10 }),
                  (0, G.jsx)(`span`, {
                    style: { color: `#1c1c1a`, fontWeight: 500 },
                    children: `New Arrivals`,
                  }),
                ],
              }),
              (0, G.jsxs)(`header`, {
                className: `arrivals-editorial-header`,
                children: [
                  (0, G.jsxs)(`div`, {
                    className: `arrivals-badge-label`,
                    children: [
                      (0, G.jsx)(O, { size: 11, strokeWidth: 2.5 }),
                      ` Season Edition`,
                    ],
                  }),
                  (0, G.jsx)(`h1`, {
                    className: `arrivals-main-heading`,
                    children: `The New Arrival Collection`,
                  }),
                  (0, G.jsx)(`p`, {
                    className: `arrivals-sub-paragraph`,
                    children: `Experience our latest weave releases. Crafted from 100% elite long-staple premium combed cotton linen, designed to introduce signature luxury textures into your bedroom environment.`,
                  }),
                ],
              }),
              o &&
                (0, G.jsxs)(`div`, {
                  style: {
                    color: `#a61d24`,
                    marginBottom: `30px`,
                    textAlign: `center`,
                  },
                  children: [`⚠️ `, o],
                }),
              c.length === 0
                ? (0, G.jsxs)(`div`, {
                    className: `empty-arrivals-view`,
                    children: [
                      (0, G.jsx)(`h3`, {
                        children: `Fresh Stock Launching Soon`,
                      }),
                      (0, G.jsx)(`p`, {
                        children: `Our artisans are finalizing our upcoming linen sets. Explore our current collections in the meantime.`,
                      }),
                      (0, G.jsxs)(x, {
                        to: `/products`,
                        style: {
                          display: `inline-flex`,
                          alignItems: `center`,
                          gap: `6px`,
                          color: `#1c1c1a`,
                          fontWeight: 500,
                          fontSize: `13px`,
                          marginTop: `14px`,
                          textDecoration: `underline`,
                        },
                        children: [
                          `Browse Main Shop `,
                          (0, G.jsx)(_, { size: 14 }),
                        ],
                      }),
                    ],
                  })
                : (0, G.jsx)(`div`, {
                    className: `arrivals-products-grid`,
                    children: c.map((e) =>
                      (0, G.jsx)(Re, { product: e }, e._id),
                    ),
                  }),
            ],
          }),
        ],
      });
}
function Be() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
        .policy-page-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 80px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #555555;
          line-height: 1.7;
        }
        .policy-main-title {
          font-family: "Playfair Display", "Georgia", serif;
          font-size: 36px;
          font-weight: 400;
          color: #702c3a;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: 0.02em;
        }
        .policy-lead-text {
          font-size: 15px;
          margin-bottom: 36px;
          color: #555555;
        }
        .policy-link {
          color: #702c3a;
          text-decoration: underline;
          font-weight: 500;
        }
        .policy-sub-section {
          margin-top: 32px;
          margin-bottom: 20px;
        }
        .policy-sub-heading {
          font-size: 15px;
          font-weight: 700;
          color: #702c3a;
          border-bottom: 1px solid #702c3a;
          padding-bottom: 4px;
          margin-bottom: 16px;
          display: inline-block;
        }
        .policy-list {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
        }
        .policy-list li {
          font-size: 14px;
          margin-bottom: 12px;
          padding-left: 24px;
          position: relative;
          color: #666666;
        }
        .policy-italic-notice {
          font-style: italic;
          color: #888888;
          font-size: 13.5px;
          margin-top: 12px;
          line-height: 1.6;
        }
      `,
      }),
      (0, G.jsxs)(`div`, {
        className: `policy-page-container`,
        children: [
          (0, G.jsx)(`h1`, {
            className: `policy-main-title`,
            children: `Shipping Policy`,
          }),
          (0, G.jsxs)(`p`, {
            className: `policy-lead-text`,
            children: [
              `We offer `,
              (0, G.jsx)(`strong`, { children: `free delivery` }),
              ` to all our customers across India for all orders. For International orders there will be additional shipping charge.`,
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `policy-sub-section`,
            children: [
              (0, G.jsx)(`h3`, {
                className: `policy-sub-heading`,
                children: `Order confirmation and shipping:`,
              }),
              (0, G.jsxs)(`ul`, {
                className: `policy-list`,
                children: [
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `1.`,
                      }),
                      `Once you place an order, you will receive an email and SMS, confirming your order.`,
                    ],
                  }),
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `2.`,
                      }),
                      `All orders are shipped within 3 business days and delivery can take 2-10 business days depending on location.`,
                    ],
                  }),
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `3.`,
                      }),
                      `You will receive a shipping confirmation with a tracking link, once your order is shipped.`,
                    ],
                  }),
                ],
              }),
              (0, G.jsx)(`p`, {
                className: `policy-italic-notice`,
                children: `For all COD orders, a customer care executive will call/WhatsApp you to confirm your order. In the absence of response/confirmation, your order will stand cancelled.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `policy-sub-section`,
            children: [
              (0, G.jsx)(`h3`, {
                className: `policy-sub-heading`,
                children: `Order cancellation:`,
              }),
              (0, G.jsxs)(`ul`, {
                className: `policy-list`,
                children: [
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `1.`,
                      }),
                      `You can cancel/modify your order as long as it has not been shipped. Once the order has been shipped, we will not be able to accept any cancellations. For any cancellations, please write to us at`,
                      ` `,
                      (0, G.jsx)(`a`, {
                        href: `mailto:padminivastra@gmail.com`,
                        className: `policy-link`,
                        children: `padminivastra@gmail.com`,
                      }),
                      ` and we will revert within 24-48 hours.`,
                    ],
                  }),
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `2.`,
                      }),
                      `Please note that for COD orders, the delivery rider will not hand-over the package to you till you make the payment. So any order cancellations or modifications cannot be made at the time of delivery and will have to be routed through our customer care.`,
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `policy-sub-section`,
            children: [
              (0, G.jsx)(`h3`, {
                className: `policy-sub-heading`,
                children: `Delivery:`,
              }),
              (0, G.jsxs)(`ul`, {
                className: `policy-list`,
                children: [
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `1.`,
                      }),
                      `Our delivery partners will make 3 attempts of delivery to you before returning the parcel to us. Please ensure you provide the correct shipping address and are available to accept the shipment.`,
                    ],
                  }),
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `2.`,
                      }),
                      `Please note that for COD orders, the delivery rider will only accept Cash. We don't provide a Card on delivery service in any part of the country.`,
                    ],
                  }),
                ],
              }),
              (0, G.jsx)(`p`, {
                className: `policy-italic-notice`,
                children: `In case of COD orders, we suggest you leave the cash with someone else in case you are not available at the shipping address.`,
              }),
              (0, G.jsxs)(`p`, {
                style: { fontSize: `14px`, color: `#666`, marginTop: `16px` },
                children: [
                  `Please write to us at`,
                  ` `,
                  (0, G.jsx)(`a`, {
                    href: `mailto:padminivastra@gmail.com`,
                    className: `policy-link`,
                    children: `padminivastra@gmail.com`,
                  }),
                  ` or reach out to us on Instagram for any queries/clarifications.`,
                ],
              }),
              (0, G.jsxs)(`p`, {
                style: { fontSize: `14px`, color: `#666`, marginTop: `10px` },
                children: [
                  `Read our`,
                  ` `,
                  (0, G.jsx)(x, {
                    to: `/return-policy`,
                    className: `policy-link`,
                    children: `"Returns" policy here`,
                  }),
                  `.`,
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Ve() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
        .policy-page-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 80px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #555555;
          line-height: 1.6;
        }

        .policy-main-title {
          font-family: "Playfair Display", "Georgia", serif;
          font-size: 36px;
          font-weight: 400;
          color: #702c3a;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: 0.02em;
        }

        .policy-lead-text {
          font-size: 15px;
          text-align: center;
          margin-bottom: 40px;
          color: #555555;
        }

        .policy-sub-section {
          margin-top: 35px;
          margin-bottom: 25px;
        }

        .policy-sub-heading {
          font-size: 15px;
          font-weight: 700;
          color: #702c3a;
          border-bottom: 1px solid #702c3a;
          padding-bottom: 4px;
          margin-bottom: 18px;
          display: inline-block;
        }
      `,
      }),
      (0, G.jsxs)(`div`, {
        className: `policy-page-container`,
        children: [
          (0, G.jsx)(`h1`, {
            className: `policy-main-title`,
            children: `Terms & Conditions`,
          }),
          (0, G.jsx)(`p`, {
            className: `policy-lead-text`,
            children: `Welcome to Padmini Vastra Living. Please review our platform usage parameters.`,
          }),
          (0, G.jsxs)(`div`, {
            className: `policy-sub-section`,
            children: [
              (0, G.jsx)(`h3`, {
                className: `policy-sub-heading`,
                children: `1. Ownership & Interface`,
              }),
              (0, G.jsx)(`p`, {
                style: { fontSize: `14px`, color: `#666`, lineHeight: `1.6` },
                children: `All premium material selections, visual layout components, text descriptors, logo brand illustrations, and custom digital media assets hosted across this storefront are protected via domestic registration copyrights.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `policy-sub-section`,
            children: [
              (0, G.jsx)(`h3`, {
                className: `policy-sub-heading`,
                children: `2. User Accounts`,
              }),
              (0, G.jsx)(`p`, {
                style: { fontSize: `14px`, color: `#666`, lineHeight: `1.6` },
                children: `Users registering authorization credentials across our login gateway models are fully responsible for maintaining secure session access control variables on their endpoint terminals.`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function He() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
        .policy-page-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 80px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #555555;
          line-height: 1.7;
        }
        .policy-main-title {
          font-family: "Playfair Display", "Georgia", serif;
          font-size: 36px;
          font-weight: 400;
          color: #702c3a;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: 0.02em;
        }
        .policy-lead-text {
          font-size: 15px;
          margin-bottom: 10px;
          color: #555555;
        }
        .policy-link {
          color: #702c3a;
          text-decoration: underline;
          font-weight: 500;
        }
        .policy-sale-notice {
          background: #fff5f5;
          border: 1px solid #f5c6c6;
          border-radius: 6px;
          padding: 14px 18px;
          font-size: 14px;
          font-weight: 700;
          color: #702c3a;
          margin: 20px 0 28px 0;
          text-align: center;
          letter-spacing: 0.02em;
        }
        .policy-sub-section {
          margin-top: 32px;
          margin-bottom: 20px;
        }
        .policy-sub-heading {
          font-size: 15px;
          font-weight: 700;
          color: #702c3a;
          border-bottom: 1px solid #702c3a;
          padding-bottom: 4px;
          margin-bottom: 16px;
          display: inline-block;
        }
        .policy-list {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
        }
        .policy-list li {
          font-size: 14px;
          margin-bottom: 12px;
          padding-left: 24px;
          position: relative;
          color: #666666;
        }
        .policy-address-box {
          background: #fafaf7;
          border: 1px solid #e8e8e8;
          border-radius: 8px;
          padding: 16px 20px;
          font-size: 14px;
          color: #444;
          line-height: 1.8;
          margin-top: 10px;
        }
      `,
      }),
      (0, G.jsxs)(`div`, {
        className: `policy-page-container`,
        children: [
          (0, G.jsx)(`h1`, {
            className: `policy-main-title`,
            children: `Return & Refund Policy`,
          }),
          (0, G.jsx)(`p`, {
            className: `policy-lead-text`,
            children: `We believe in utmost transparency while we display our products and try our best to convey the product quality and design through the images. Our products are made/printed by hand and may have slight irregularities that are a natural outcome of the human involvement in the process and must not be treated as defects.`,
          }),
          (0, G.jsx)(`div`, {
            className: `policy-sale-notice`,
            children: `NO RETURNS / EXCHANGES ALLOWED IN OUR SALE PERIOD which is ≥25% OFF SALE`,
          }),
          (0, G.jsxs)(`div`, {
            className: `policy-sub-section`,
            children: [
              (0, G.jsx)(`h3`, {
                className: `policy-sub-heading`,
                children: `Returns and refunds:`,
              }),
              (0, G.jsx)(`p`, {
                style: {
                  fontSize: `14px`,
                  color: `#666`,
                  marginBottom: `16px`,
                },
                children: `That being said, for any reasons if you do not like the purchase, we will be happy to accept a return and refund the amount to your bank account once the returned package is received at our warehouse, under the following conditions:`,
              }),
              (0, G.jsxs)(`ul`, {
                className: `policy-list`,
                children: [
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `1.`,
                      }),
                      `The return request for the product must be made within 3 days of receiving the product by writing to us at`,
                      ` `,
                      (0, G.jsx)(`a`, {
                        href: `mailto:padminivastra@gmail.com`,
                        className: `policy-link`,
                        children: `padminivastra@gmail.com`,
                      }),
                      `. Rs 200 will be deducted in case of return.`,
                    ],
                  }),
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `2.`,
                      }),
                      `Please ensure that the merchandise is unused, in its original packaging, and in the same condition as you received it, failing which your claim may be denied upon us receiving the product.`,
                    ],
                  }),
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `3.`,
                      }),
                      `If the reason of your return is that the product delivered to you does not match your order or has a manufacturing defect, we will pick-up the package at no cost.`,
                    ],
                  }),
                  (0, G.jsxs)(`li`, {
                    children: [
                      (0, G.jsx)(`span`, {
                        style: {
                          position: `absolute`,
                          left: 0,
                          fontWeight: `500`,
                        },
                        children: `4.`,
                      }),
                      `If the reason of your return is that for some reason you do not like your purchase or have changed your mind, we request you to self-ship it at the below mentioned address.`,
                    ],
                  }),
                ],
              }),
              (0, G.jsx)(`p`, {
                style: {
                  fontSize: `14px`,
                  color: `#666`,
                  marginTop: `8px`,
                  marginBottom: `8px`,
                },
                children: `The address for return is as follows:`,
              }),
              (0, G.jsxs)(`div`, {
                className: `policy-address-box`,
                children: [
                  `2033, ATS Dolce, Sector Zeta 1,`,
                  (0, G.jsx)(`br`, {}),
                  `Greater Noida — UP 201310`,
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Ue() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
        .tos-container {
          max-width: 780px;
          margin: 0 auto;
          padding: 72px 24px 100px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #444;
          line-height: 1.75;
        }
        .tos-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 36px;
          font-weight: 400;
          color: #702c3a;
          text-align: center;
          margin-bottom: 40px;
          letter-spacing: 0.02em;
        }
        .tos-intro {
          font-size: 14px;
          color: #555;
          margin-bottom: 40px;
        }
        .tos-section {
          margin-top: 36px;
        }
        .tos-section-title {
          font-size: 13px;
          font-weight: 700;
          color: #702c3a;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1px solid #e8d5d8;
          padding-bottom: 6px;
          margin-bottom: 14px;
        }
        .tos-body {
          font-size: 14px;
          color: #555;
        }
      `,
      }),
      (0, G.jsxs)(`div`, {
        className: `tos-container`,
        children: [
          (0, G.jsx)(`h1`, {
            className: `tos-title`,
            children: `Terms of Service`,
          }),
          (0, G.jsx)(`p`, {
            className: `tos-intro`,
            children: `This website is operated by Padmini Vastra. Throughout the site, the terms "we", "us" and "our" refer to Team Padmini Vastra. Padmini Vastra offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.`,
          }),
          (0, G.jsx)(`p`, {
            className: `tos-intro`,
            children: `By visiting our site and/ or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.`,
          }),
          (0, G.jsx)(`p`, {
            className: `tos-intro`,
            children: `Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.`,
          }),
          (0, G.jsx)(`p`, {
            className: `tos-intro`,
            children: `Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.`,
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 1 – Online Store Terms`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `You must not transmit any worms or viruses or any code of a destructive nature.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `A breach or violation of any of the Terms will result in an immediate termination of your Services.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 2 – General Conditions`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We reserve the right to refuse service to anyone for any reason at any time.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service/product, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 3 – Accuracy, Completeness and Timeliness of Information`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 4 – Modifications to the Service and Prices`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `Prices for our products are subject to change without notice.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We reserve the right at any time to modify or discontinue the product without notice at any time.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the product.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 5 – Products`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `Certain products may be available exclusively online through the website. These products may have limited quantities and are subject to return or exchange only according to our Return Policy.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We reserve the right, but are not obligated, to limit the sales of our products to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 6 – Accuracy of Billing and Account Information`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `For more detail, please review our Returns Policy.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 7 – Optional Tools`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 8 – Third-Party Links`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `Certain content, products and services available via our Service may include materials from third-parties.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 9 – User Comments, Feedback and Other Submissions`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 10 – Personal Information`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `Your submission of personal information through the store is governed by our Privacy Policy.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 11 – Errors, Inaccuracies and Omissions`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 12 – Prohibited Uses`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 13 – Disclaimer of Warranties; Limitation of Liability`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable. You agree that from time to time we may remove the product for indefinite periods of time or cancel the product at any time, without notice to you. You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `In no case shall Padmini Vastra, our employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, cyber crime, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 14 – Indemnification`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `You agree to indemnify, defend and hold harmless Padmini Vastra and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 15 – Severability`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 16 – Termination`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 17 – Entire Agreement`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 18 – Governing Law`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 19 – Changes to Terms of Service`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `You can review the most current version of the Terms of Service at any time at this page.`,
              }),
              (0, G.jsx)(`p`, {
                className: `tos-body`,
                children: `We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.`,
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `tos-section`,
            children: [
              (0, G.jsx)(`div`, {
                className: `tos-section-title`,
                children: `Section 20 – Contact Information`,
              }),
              (0, G.jsxs)(`p`, {
                className: `tos-body`,
                children: [
                  `Questions about the Terms of Service should be sent to us at `,
                  (0, G.jsx)(`a`, {
                    href: `mailto:padminivastra@gmail.com`,
                    style: { color: `#702c3a` },
                    children: `padminivastra@gmail.com`,
                  }),
                  `.`,
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function We() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
        .cu-hero {
          width: 100%;
          height: 320px;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .cu-wrapper {
          max-width: 560px;
          margin: 0 auto;
          padding: 64px 24px 100px;
          text-align: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #333;
        }

        .cu-title {
          font-family: "Playfair Display", "Cormorant Garamond", Georgia, serif;
          font-size: 38px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1c1c1a;
          margin: 0 0 16px 0;
        }

        .cu-tagline {
          font-size: 16px;
          color: #777;
          margin: 0 0 48px 0;
          line-height: 1.6;
        }

        .cu-block {
          margin-bottom: 32px;
        }

        .cu-block p {
          font-size: 15px;
          color: #444;
          line-height: 1.8;
          margin: 0;
        }

        .cu-block a {
          color: #702c3a;
          text-decoration: none;
          border-bottom: 1px solid rgba(112, 44, 58, 0.3);
          transition: border-color 0.2s;
        }

        .cu-block a:hover {
          border-color: #702c3a;
        }

        .cu-divider {
          width: 48px;
          height: 1px;
          background: #e0e0e0;
          margin: 0 auto 32px;
        }

        .cu-address {
          font-size: 15px;
          color: #444;
          line-height: 2;
          margin: 0;
        }

        @media (max-width: 600px) {
          .cu-hero { height: 200px; }
          .cu-title { font-size: 28px; }
          .cu-wrapper { padding: 44px 20px 72px; }
        }
      `,
      }),
      (0, G.jsx)(`img`, {
        src: `https://broad-pink-npkwccgw.edgeone.app/IMG_20260605_160712.png`,
        alt: `Padmini Vastra Living`,
        className: `cu-hero`,
      }),
      (0, G.jsxs)(`div`, {
        className: `cu-wrapper`,
        children: [
          (0, G.jsx)(`h1`, { className: `cu-title`, children: `Contact Us` }),
          (0, G.jsx)(`p`, {
            className: `cu-tagline`,
            children: `Thank you for visiting us!`,
          }),
          (0, G.jsx)(`div`, {
            className: `cu-block`,
            children: (0, G.jsxs)(`p`, {
              children: [
                `For any help / information, write to us at`,
                ` `,
                (0, G.jsx)(`a`, {
                  href: `mailto:padminivastra@gmail.com`,
                  children: `padminivastra@gmail.com`,
                }),
              ],
            }),
          }),
          (0, G.jsx)(`div`, { className: `cu-divider` }),
          (0, G.jsx)(`div`, {
            className: `cu-block`,
            children: (0, G.jsxs)(`p`, {
              children: [
                `You can call / WhatsApp us at`,
                ` `,
                (0, G.jsx)(`a`, {
                  href: `https://wa.me/919633521642`,
                  children: `+91 96335 21642`,
                }),
              ],
            }),
          }),
          (0, G.jsx)(`div`, { className: `cu-divider` }),
          (0, G.jsx)(`div`, {
            className: `cu-block`,
            children: (0, G.jsxs)(`p`, {
              children: [
                `Instagram —`,
                ` `,
                (0, G.jsx)(`a`, {
                  href: `https://www.instagram.com/padminivasthra?igsh=MWk4eHhkaHFzdXNlbQ%3D%3D&utm_source=qr`,
                  target: `_blank`,
                  rel: `noopener noreferrer`,
                  children: `@padminivasthra`,
                }),
              ],
            }),
          }),
          (0, G.jsx)(`div`, { className: `cu-divider` }),
          (0, G.jsx)(`div`, {
            className: `cu-block`,
            children: (0, G.jsxs)(`p`, {
              className: `cu-address`,
              children: [
                (0, G.jsx)(`strong`, { children: `Office Address` }),
                (0, G.jsx)(`br`, {}),
                `2033, ATS Dolce, Sector Zeta 1`,
                (0, G.jsx)(`br`, {}),
                `Greater Noida — 201310`,
                (0, G.jsx)(`br`, {}),
                `Uttar Pradesh, India`,
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
var Ge = [
    {
      image: `/images/hero_banner.jpg`,
      fallback: `/images/hero_banner.jpg`,
      badge: `Indian Handloom Saree Collection`,
      title: `Padmini Vastra`,
      subtitle: `More than fashion, it’s a feeling 💕`,
      cta: `Shop Collection`,
      link: `/products`,
    },
    {
      image: `https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200`,
      fallback: `https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200`,
      badge: `Summer Cotton Collection`,
      title: `Kalyani & Mulcotton`,
      subtitle: `Lightweight drapes celebrating Indian heritage`,
      cta: `Explore Cottons`,
      link: `/products/kalyani-cotton-saree`,
    },
    {
      image: `https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200`,
      fallback: `https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200`,
      badge: `Royal Silk Festives`,
      title: `Soft & Gini Silks`,
      subtitle: `Pure silk woven into gold thread templates`,
      cta: `Explore Silks`,
      link: `/products/soft-silk-saree`,
    },
  ],
  Ke = Ge.length;
function qe() {
  let [e, t] = (0, B.useState)(0),
    [n, r] = (0, B.useState)(!1),
    i = (0, B.useRef)(0),
    a = (0, B.useRef)(!1),
    o = (0, B.useRef)(null);
  (0, B.useEffect)(() => {
    i.current = e;
  }, [e]);
  let s = (0, B.useCallback)((e) => {
      let n = ((e % Ke) + Ke) % Ke;
      (r(!0),
        setTimeout(() => {
          (t(n), r(!1));
        }, 450));
    }, []),
    c = (0, B.useCallback)(() => {
      (clearInterval(o.current),
        (o.current = setInterval(() => {
          a.current || s(i.current + 1);
        }, 5e3)));
    }, [s]);
  (0, B.useEffect)(() => (c(), () => clearInterval(o.current)), [c]);
  let l = (e) => {
      (s(e), c());
    },
    u = Ge[e] ?? Ge[0];
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
            .hero-slide-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; opacity: 0; transition: opacity 0.7s ease; }
            .hero-slide-img.hero-slide-active { opacity: 1; }
            .hero-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 20; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #fff; width: 44px; height: 44px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 22px; line-height: 1; transition: background 0.2s; }
            .hero-arrow:hover { background: rgba(255,255,255,0.35); }
            .hero-arrow.left { left: 24px; }
            .hero-arrow.right { right: 24px; }
            .hero-text-section { padding: 56px 24px; text-align: center; background-color: #fbfaf7; border-bottom: 1px solid #eae9e4; }
            .hero-intro-badge { display: inline-block; border: 1px solid #c5a880; color: #b08d5c; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; padding: 6px 18px; border-radius: 20px; margin-bottom: 16px; font-family: sans-serif; }
            .hero-intro-title { font-family: 'Cormorant Garamond', 'Playfair Display', serif; font-size: 3rem; font-weight: 500; color: #1c1c1a; margin: 0 0 14px 0; letter-spacing: -0.01em; }
            .hero-intro-subtitle { font-size: 1.15rem; color: #555550; margin: 0 0 28px 0; font-style: italic; font-family: Georgia, serif; }
            .hero-intro-cta { display: inline-block; background: #1c1c1a; color: #fff; padding: 13px 36px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 4px; transition: background 0.2s; }
            .hero-intro-cta:hover { background: #3d3d3a; }
            @media (max-width: 768px) {
              .hero-arrow { width: 36px; height: 36px; font-size: 18px; }
              .hero-arrow.left { left: 12px; }
              .hero-arrow.right { right: 12px; }
              .hero-intro-title { font-size: 2.2rem; }
              .hero-intro-subtitle { font-size: 1rem; }
            }
          `,
      }),
      (0, G.jsx)(`div`, {
        style: {
          width: `100%`,
          backgroundColor: `#fff`,
          overflow: `visible`,
          position: `relative`,
          zIndex: 1,
        },
        children: (0, G.jsxs)(B.Fragment, {
          children: [
            (0, G.jsxs)(`section`, {
              className: `hero-wrapper`,
              style: {
                position: `relative`,
                height: `70vh`,
                overflow: `hidden`,
                backgroundColor: `#111`,
              },
              onMouseEnter: () => {
                a.current = !0;
              },
              onMouseLeave: () => {
                a.current = !1;
              },
              children: [
                Ge.map((t, n) =>
                  (0, G.jsx)(
                    `img`,
                    {
                      src: t.image,
                      alt: t.title,
                      className: `hero-slide-img${n === e ? ` hero-slide-active` : ``}`,
                      onError: (e) => {
                        ((e.target.onerror = null),
                          (e.target.src = t.fallback));
                      },
                    },
                    n,
                  ),
                ),
                (0, G.jsx)(`button`, {
                  className: `hero-arrow left`,
                  onClick: () => l(e - 1),
                  "aria-label": `Previous`,
                  children: `‹`,
                }),
                (0, G.jsx)(`button`, {
                  className: `hero-arrow right`,
                  onClick: () => l(e + 1),
                  "aria-label": `Next`,
                  children: `›`,
                }),
              ],
            }),
            (0, G.jsx)(`div`, {
              className: `hero-text-section`,
              children: (0, G.jsxs)(`div`, {
                style: { maxWidth: `800px`, margin: `0 auto` },
                children: [
                  (0, G.jsx)(`span`, {
                    className: `hero-intro-badge`,
                    children: `Indian Handloom Saree Collection`,
                  }),
                  (0, G.jsx)(`h1`, {
                    className: `hero-intro-title`,
                    children: `Padmini Vastra`,
                  }),
                  (0, G.jsx)(`p`, {
                    className: `hero-intro-subtitle`,
                    children: `More than fashion, it’s a feeling 💕`,
                  }),
                  (0, G.jsx)(x, {
                    to: `/products`,
                    className: `hero-intro-cta`,
                    children: `Shop Collection`,
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}

var Je = [
  { Icon: te, label: `Free Delivery`, sub: `On orders above ₹999` },
  { Icon: t, label: `COD Available`, sub: `Cash on delivery, PAN India` },
  { Icon: M, label: `Easy Returns`, sub: `Hassle-free, no questions asked` },
  {
    Icon: se,
    label: `100% Pure Cotton`,
    sub: `Long-staple, certified quality`,
  },
  { Icon: ne, label: `Secure Checkout`, sub: `Razorpay encrypted payments` },
];
function Ye() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
        .usp-strip {
          background: #fafaf7;
          border-top: 1px solid #ebebeb;
          border-bottom: 1px solid #ebebeb;
          padding: 0 40px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .usp-strip::-webkit-scrollbar { display: none; }

        .usp-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: stretch;
          min-height: 80px;
        }

        .usp-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 0;
          flex: 1;
          min-width: 160px;
        }

        .usp-divider {
          width: 1px;
          background: #e8e8e8;
          align-self: stretch;
          margin: 16px 0;
          flex-shrink: 0;
        }

        .usp-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #702c3a;
          flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .usp-item:hover .usp-icon-wrap {
          background: #702c3a;
          border-color: #702c3a;
          color: #fff;
        }

        .usp-text-label {
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #1c1c1a;
          letter-spacing: 0.02em;
          line-height: 1.3;
          white-space: nowrap;
        }
        .usp-text-sub {
          font-size: 11px;
          color: #888;
          font-weight: 400;
          line-height: 1.4;
          margin-top: 2px;
          white-space: normal;
          max-width: 130px;
        }

        @media (max-width: 1024px) {
          .usp-strip { padding: 0 24px; }
          .usp-item { min-width: 140px; gap: 10px; }
        }

        @media (max-width: 600px) {
          .usp-strip { padding: 0 16px; }
          .usp-inner { min-height: 64px; }
          .usp-item { min-width: 110px; padding: 14px 0; gap: 8px; }
          .usp-text-sub { display: none; }
          .usp-icon-wrap { width: 34px; height: 34px; }
          .usp-text-label { font-size: 11px; white-space: normal; max-width: 80px; }
        }
      `,
      }),
      (0, G.jsx)(`div`, {
        className: `usp-strip`,
        children: (0, G.jsx)(`div`, {
          className: `usp-inner`,
          children: Je.map(({ Icon: e, label: t, sub: n }, r) =>
            (0, G.jsxs)(
              B.Fragment,
              {
                children: [
                  r > 0 && (0, G.jsx)(`div`, { className: `usp-divider` }),
                  (0, G.jsxs)(`div`, {
                    className: `usp-item`,
                    children: [
                      (0, G.jsx)(`div`, {
                        className: `usp-icon-wrap`,
                        children: (0, G.jsx)(e, { size: 17, strokeWidth: 1.8 }),
                      }),
                      (0, G.jsxs)(`div`, {
                        children: [
                          (0, G.jsx)(`div`, {
                            className: `usp-text-label`,
                            children: t,
                          }),
                          (0, G.jsx)(`div`, {
                            className: `usp-text-sub`,
                            children: n,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              t,
            ),
          ),
        }),
      }),
    ],
  });
}
function Xe() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        dangerouslySetInnerHTML: {
          __html: `
        .force-horizontal-section { max-width: 100vw !important; margin: 0 auto !important; padding: 60px 100px !important; background-color: #ffffff !important; display: block !important; box-sizing: border-box !important; }
        .force-horizontal-heading { font-family: "Playfair Display", "Georgia", serif !important; font-size: 30px !important; font-weight: 400 !important; color: #702c3a !important; margin-top: 0 !important; margin-bottom: 40px !important; letter-spacing: 0.02em !important; text-align: left !important; }
        .force-horizontal-grid { display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; justify-content: flex-start !important; align-items: stretch !important; gap: 32px 2% !important; width: 100% !important; box-sizing: border-box !important; }
        .force-horizontal-card { width: 32% !important; flex: 0 0 32% !important; display: flex !important; flex-direction: column !important; text-decoration: none !important; background: none !important; border: none !important; padding: 0 !important; margin: 0 !important; cursor: pointer !important; box-sizing: border-box !important; }
        .force-horizontal-card.text-only-variant { border: 1px solid #f3f3f3 !important; background-color: #faf9f8 !important; display: flex !important; align-items: center !important; justify-content: center !important; aspect-ratio: 4 / 5 !important; padding: 24px !important; transition: background-color 0.3s ease !important; }
        .force-horizontal-card.text-only-variant:hover { background-color: #f5f3f1 !important; }
        .force-horizontal-wrapper { width: 100% !important; aspect-ratio: 4 / 5 !important; overflow: hidden !important; background-color: #fcfbfa !important; margin-bottom: 14px !important; }
        .force-horizontal-img { width: 100% !important; height: 100% !important; object-fit: cover !important; display: block !important; transition: transform 0.6s ease !important; }
        .force-horizontal-card:hover .force-horizontal-img { transform: scale(1.03) !important; }
        .force-horizontal-label { font-family: "Playfair Display", "Georgia", serif !important; font-size: 13px !important; text-transform: uppercase !important; letter-spacing: 0.12em !important; color: #702c3a !important; font-weight: 500 !important; display: flex !important; align-items: center !important; justify-content: center !important; gap: 6px !important; margin-top: 4px !important; transition: gap 0.2s ease !important; }
        .force-horizontal-card:hover .force-horizontal-label { gap: 10px !important; }
        @media (max-width: 1024px) {
          .force-horizontal-section { padding: 40px 24px !important; }
          .force-horizontal-card { width: 48% !important; flex: 0 0 48% !important; }
          .force-horizontal-grid { gap: 20px 4% !important; }
        }
        @media (max-width: 600px) {
          .force-horizontal-section { padding: 32px 0 32px 16px !important; }
          .force-horizontal-heading { font-size: 22px !important; margin-bottom: 22px !important; padding-right: 16px !important; }
          .force-horizontal-grid {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            gap: 14px !important;
            padding-right: 16px !important;
            padding-bottom: 8px !important;
            -webkit-overflow-scrolling: touch !important;
            scroll-snap-type: x mandatory !important;
            scrollbar-width: none !important;
          }
          .force-horizontal-grid::-webkit-scrollbar { display: none !important; }
          .force-horizontal-card {
            flex: 0 0 65vw !important;
            min-width: 65vw !important;
            max-width: 65vw !important;
            width: 65vw !important;
            scroll-snap-align: start !important;
          }
          .force-horizontal-label { font-size: 11px !important; letter-spacing: 0.08em !important; }
        }
      `,
        },
      }),
      (0, G.jsxs)(`section`, {
        className: `force-horizontal-section`,
        id: `explore-collections`,
        children: [
          (0, G.jsx)(`h2`, {
            className: `force-horizontal-heading`,
            children: `What are you looking for?`,
          }),
          (0, G.jsx)(`div`, {
            className: `force-horizontal-grid`,
            children: [
              {
                url: `/products/kalyani-cotton-saree`,
                name: `Kalyani Cotton`,
                type: `media`,
                image: `/uploads/categories/1.jpg`,
              },
              {
                url: `/products/khadi-embroidery-saree`,
                name: `Khadi Embroidery`,
                type: `media`,
                image: `/uploads/categories/2.jpg`,
              },
              {
                url: `/products/mul-cotton-saree`,
                name: `Mul Cotton`,
                type: `media`,
                image: `/uploads/categories/3.jpg`,
              },
              {
                url: `/products/gini-tissue-saree`,
                name: `Gini Tissue`,
                type: `media`,
                image: `/uploads/categories/4.jpg`,
              },
              {
                url: `/products/soft-silk-saree`,
                name: `Soft Silk`,
                type: `media`,
                image: `/uploads/categories/5.jpg`,
              },
              {
                url: `/products/border-less-soft-silk-saree`,
                name: `Borderless Silk`,
                type: `media`,
                image: `/uploads/categories/6.jpg`,
              },
              {
                url: `/products/plain-soft-silk-saree`,
                name: `Plain Silk`,
                type: `media`,
                image: `/uploads/categories/7.jpg`,
              },
              {
                url: `/products/champion-silk-saree`,
                name: `Champion Silk`,
                type: `media`,
                image: `/uploads/categories/8.jpg`,
              },
              {
                url: `/products/ds-kottanchi-saree`,
                name: `Ds Kottanchi`,
                type: `media`,
                image: `/uploads/categories/9.jpg`,
              },
            ].map((e, t) =>
              e.type === `text-only`
                ? (0, G.jsx)(
                    x,
                    {
                      to: e.url,
                      className: `force-horizontal-card text-only-variant`,
                      children: (0, G.jsxs)(`span`, {
                        className: `force-horizontal-label`,
                        children: [e.name, ` →`],
                      }),
                    },
                    t,
                  )
                : (0, G.jsxs)(
                    x,
                    {
                      to: e.url,
                      className: `force-horizontal-card`,
                      children: [
                        (0, G.jsx)(`div`, {
                          className: `force-horizontal-wrapper`,
                          children: (0, G.jsx)(`img`, {
                            src: e.image,
                            alt: `${e.name} Collection`,
                            className: `force-horizontal-img`,
                            loading: `lazy`,
                            onError: (t) => {
                              t.target.src = `https://placehold.co/400x500?text=${e.name}`;
                            },
                          }),
                        }),
                        (0, G.jsxs)(`span`, {
                          className: `force-horizontal-label`,
                          children: [e.name, ` →`],
                        }),
                      ],
                    },
                    t,
                  ),
            ),
          }),
        ],
      }),
    ],
  });
}
function Ze({ products: e = [] }) {
  let t = (() => {
    let t = e.filter((e) => e.stock > 0);
    return (t.length >= 5 ? t : e).slice(0, 5);
  })();
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        dangerouslySetInnerHTML: {
          __html: `
        .bestsellers-section {
          max-width: 100vw;
          margin: 0 auto;
          padding: 60px 60px;
          background-color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          text-align: center;
        }

        .section-header-title {
          font-family: "Playfair Display", "Didot", "Georgia", serif;
          font-size: 26px;
          font-weight: 400;
          color: #702c3a;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .section-header-tagline {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #92757a;
          text-transform: uppercase;
          margin-bottom: 40px;
        }

        .bestsellers-grid {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 28px;
          width: 100%;
        }

        /* Each card staggers in via CSS animation delay */
        .product-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: inherit;
          min-width: 0;
          opacity: 0;
          transform: translateY(24px);
          animation: bsCardIn 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes bsCardIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .product-card:nth-child(1) { animation-delay: 0ms; }
        .product-card:nth-child(2) { animation-delay: 90ms; }
        .product-card:nth-child(3) { animation-delay: 180ms; }
        .product-card:nth-child(4) { animation-delay: 270ms; }
        .product-card:nth-child(5) { animation-delay: 360ms; }

        .product-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 0.82 / 1;
          border-top-left-radius: 182px;
          border-top-right-radius: 182px;
          overflow: hidden;
          background-color: #f7f5f3;
          margin-bottom: 16px;
          transition: box-shadow 0.3s ease;
        }
        .product-card:hover .product-image-container {
          box-shadow: 0 12px 32px rgba(112,44,58,0.12);
        }

        .product-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .product-card:hover .product-main-img {
          transform: scale(1.05);
        }

        .badge-stack {
          position: absolute;
          top: 12px; left: 12px;
          display: flex; flex-direction: column;
          gap: 5px; align-items: flex-start; z-index: 5;
        }

        .luxury-badge {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.08em; padding: 4px 10px;
          text-transform: uppercase; border-radius: 12px; color: #ffffff;
        }
        .luxury-badge.bestseller  { background-color: #691b29; }
        .luxury-badge.new-arrival { background-color: #2b703e; }
        .luxury-badge.sale        { background-color: #8b7355; }

        .product-title {
          font-family: "Playfair Display", "Georgia", serif;
          font-size: 13px; line-height: 1.45;
          color: #602531; margin: 0 0 8px 0;
          font-weight: 400; padding: 0 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 36px;
          transition: color 0.2s;
        }
        .product-card:hover .product-title { color: #702c3a; }

        .product-price-row {
          display: flex; align-items: baseline; gap: 6px;
          flex-wrap: wrap; justify-content: center;
          margin-top: auto;
        }
        .product-price-current {
          font-family: "Playfair Display", "Georgia", serif;
          font-size: 14px; font-weight: 600;
          color: #702c3a; letter-spacing: 0.01em;
        }
        .product-price-original {
          font-size: 12px; color: #bcbcb8;
          text-decoration: line-through;
        }

        /* "Shop Now" link that appears on hover */
        .product-shop-link {
          margin-top: 10px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #702c3a; text-decoration: none;
          border-bottom: 1px solid #702c3a;
          opacity: 0; transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .product-card:hover .product-shop-link {
          opacity: 1; transform: translateY(0);
        }

        /* ── Skeleton state when no products ── */
        .bs-skeleton {
          background: linear-gradient(90deg,#f0f0f0 25%,#fafafa 50%,#f0f0f0 75%);
          background-size: 200% 100%;
          animation: bsSkel 1.4s infinite;
          border-radius: 8px;
        }
        @keyframes bsSkel { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* View all link */
        .bs-view-all {
          display: inline-block;
          margin-top: 36px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #702c3a; text-decoration: none;
          border-bottom: 1.5px solid #702c3a;
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .bs-view-all:hover { opacity: 0.7; }

        @media (max-width: 1024px) {
          .bestsellers-section { padding: 40px 24px; }
          .bestsellers-grid { gap: 16px; }
        }
        @media (max-width: 640px) {
          .bestsellers-section { padding: 36px 0 36px 16px; }
          .section-header-title { font-size: 20px; letter-spacing: 0.08em; }
          .section-header-tagline { font-size: 10px; margin-bottom: 28px; }
          .bestsellers-grid {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 14px;
            padding-right: 16px;
            padding-bottom: 8px;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
          }
          .bestsellers-grid::-webkit-scrollbar { display: none; }
          .product-card {
            flex: 0 0 62vw;
            min-width: 62vw;
            max-width: 62vw;
            scroll-snap-align: start;
          }
          .product-title { font-size: 12px; min-height: auto; }
          .product-price-current { font-size: 12px; }
          .product-shop-link { display: none; }
          .bs-view-all { margin-left: 0; }
        }
      `,
        },
      }),
      (0, G.jsxs)(`section`, {
        className: `bestsellers-section`,
        id: `best-sellers-vault`,
        children: [
          (0, G.jsx)(`h2`, {
            className: `section-header-title`,
            children: `Our Bestsellers`,
          }),
          (0, G.jsx)(`p`, {
            className: `section-header-tagline`,
            children: `Handpicked from our most loved collections`,
          }),
          (0, G.jsx)(`div`, {
            className: `bestsellers-grid`,
            children:
              t.length === 0
                ? Array.from({ length: 5 }).map((e, t) =>
                    (0, G.jsxs)(
                      `div`,
                      {
                        className: `product-card`,
                        style: { animationDelay: `${t * 90}ms` },
                        children: [
                          (0, G.jsx)(`div`, {
                            className: `product-image-container bs-skeleton`,
                          }),
                          (0, G.jsx)(`div`, {
                            className: `bs-skeleton`,
                            style: {
                              height: 12,
                              width: `80%`,
                              borderRadius: 6,
                              marginBottom: 8,
                            },
                          }),
                          (0, G.jsx)(`div`, {
                            className: `bs-skeleton`,
                            style: {
                              height: 12,
                              width: `55%`,
                              borderRadius: 6,
                            },
                          }),
                        ],
                      },
                      t,
                    ),
                  )
                : t.map((e, t) => {
                    let n = e.discountPrice ?? e.price,
                      r = e.discountPercent > 0,
                      i =
                        e.createdAt &&
                        Date.now() - new Date(e.createdAt).getTime() <
                          720 * 3600 * 1e3;
                    return (0, G.jsxs)(
                      x,
                      {
                        to: `/product/${e._id}`,
                        className: `product-card`,
                        style: { animationDelay: `${t * 90}ms` },
                        children: [
                          (0, G.jsxs)(`div`, {
                            className: `product-image-container`,
                            children: [
                              (0, G.jsxs)(`div`, {
                                className: `badge-stack`,
                                children: [
                                  (0, G.jsx)(`span`, {
                                    className: `luxury-badge bestseller`,
                                    children: `Bestseller`,
                                  }),
                                  i &&
                                    (0, G.jsx)(`span`, {
                                      className: `luxury-badge new-arrival`,
                                      children: `New`,
                                    }),
                                  r &&
                                    (0, G.jsxs)(`span`, {
                                      className: `luxury-badge sale`,
                                      children: [`-`, e.discountPercent, `%`],
                                    }),
                                ],
                              }),
                              (0, G.jsx)(`img`, {
                                src:
                                  e.image ||
                                  `https://placehold.co/400x500?text=Padmini Vastra`,
                                alt: e.name,
                                className: `product-main-img`,
                                loading: `lazy`,
                                onError: (e) => {
                                  e.target.src = `https://placehold.co/400x500?text=Padmini Vastra`;
                                },
                              }),
                            ],
                          }),
                          (0, G.jsx)(`h3`, {
                            className: `product-title`,
                            children: e.name,
                          }),
                          (0, G.jsxs)(`div`, {
                            className: `product-price-row`,
                            children: [
                              (0, G.jsxs)(`span`, {
                                className: `product-price-current`,
                                children: [
                                  `Rs. `,
                                  Number(n).toLocaleString(`en-IN`, {
                                    minimumFractionDigits: 2,
                                  }),
                                ],
                              }),
                              r &&
                                (0, G.jsxs)(`span`, {
                                  className: `product-price-original`,
                                  children: [
                                    `Rs. `,
                                    Number(e.price).toLocaleString(`en-IN`, {
                                      minimumFractionDigits: 2,
                                    }),
                                  ],
                                }),
                            ],
                          }),
                          (0, G.jsx)(`span`, {
                            className: `product-shop-link`,
                            children: `Shop Now →`,
                          }),
                        ],
                      },
                      e._id,
                    );
                  }),
          }),
          (0, G.jsx)(x, {
            to: `/products`,
            className: `bs-view-all`,
            children: `View All Products →`,
          }),
        ],
      }),
    ],
  });
}
function Qe() {
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        dangerouslySetInnerHTML: {
          __html: `
        .luxury-story-section {
          position: relative !important;
          /* Premium soft charcoal/espresso base (Not pure solid black) */
          background-color: #322f30ed !important; 
          color: #ffffff !important;
          padding: 110px 40px !important; /* Slightly increased padding for breathing room */
          width: 100% !important;
          box-sizing: border-box !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
          overflow: hidden !important;
        }

        /* Ambient Background Texture Overlay Effect */
        .luxury-story-section::before {
          content: "" !important;
          position: absolute !important;
          inset: 0 !important;
          /* Blends an organic weaving background texture at ultra-low opacity */
          background-image: url('https://images.unsplash.com/photo-1544207240-8b1025eb7aeb?q=80&w=1200') !important;
          background-size: cover !important;
          background-position: center !important;
          opacity: 0.07 !important; /* Kept very subtle to prevent rendering noise behind text */
          mix-blend-mode: overlay !important;
          z-index: 1 !important;
          pointer-events: none !important;
        }

        .luxury-story-container {
          max-width: 1250px !important;
          margin: 0 auto !important;
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 70px !important;
          position: relative !important;
          z-index: 2 !important; /* Places content above background mask texture */
        }

        /* Editorial Left Content Column */
        .story-content-side {
          flex: 1.3 !important;
          text-align: left !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
        }

        .story-accent-tag {
          font-size: 17x !important; /* Scaled up slightly */
          font-weight: 600 !important;
          letter-spacing: 0.32em !important;
          color: #e5b3b9 !important; /* High-end soft rose/pastel accent text */
          text-transform: uppercase !important;
          margin-bottom: 18px !important;
          display: block !important;
        }

        .story-main-title {
          font-family: "Playfair Display", "Didot", "Georgia", serif !important; /* Explicit luxury typography match */
          font-size: 42px !important; /* Scaled up for better impact and premium presence */
          font-weight: 400 !important;
          line-height: 1.3 !important;
          color: #ffffff !important;
          margin: 0 0 28px 0 !important;
          letter-spacing: 0.03em !important;
        }

        .story-body-text {
          font-size: 17.5px !important; /* Scaled up slightly from 14px for cleaner readability */
          line-height: 1.45 !important;
          color: #e2e2e2 !important;
          font-weight: 300 !important;
          margin-bottom: 36px !important;
          letter-spacing: 0.02em !important;
        }

        /* Material highlights list */
        .story-perks-list {
          display: flex !important;
          flex-direction: row !important;
          gap: 32px !important;
          margin-bottom: 44px !important;
          padding: 0 !important;
          list-style: none !important;
        }

        .perk-item {
          flex: 1 !important;
          border-left: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding-left: 20px !important;
        }

        .perk-title {
          font-size: 14px !important; /* Scaled up */
          font-weight: 600 !important;
          color: #ffffff !important;
          margin-bottom: 8px !important;
          letter-spacing: 0.05em !important;
        }

        .perk-desc {
          font-size: 14.5px !important; /* Scaled up */
          color: #b5b5b5 !important;
          line-height: 1.5 !important;
        }

        .story-cta-btn {
          display: inline-block !important;
          align-self: flex-start !important;
          background-color: transparent !important;
          color: #ffffff !important;
          border: 1px solid #e5b3b9 !important;
          border-radius: 14px !important;
          padding: 14px 36px !important;
          text-decoration: none !important;
          font-weight: 600 !important;
          font-size: 11.5px !important;
          letter-spacing: 0.22em !important;
          text-transform: uppercase !important;
          text-decoration: none !important;
          padding: 16px 40px !important;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }

        .story-cta-btn:hover {
          background-color: #ffffff !important;
          color: #1e191a !important;
          border-color: #ffffff !important;
        }

        /* Interactive Right Media Column */
        .story-media-side {
          flex: 1 !important;
          position: relative !important;
          display: flex !important;
          justify-content: center !important;
        }

        .main-media-frame {
          width: 85% !important;
          overflow: hidden !important;
          background-color: #2a2526 !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3) !important;
        }

        .main-media-img {
          width: 100% !important;
          height: auto !important;
          display: block !important;
          object-fit: contain !important;
          filter: grayscale(10%) contrast(105%) !important;
          transition: transform 0.6s ease !important;
        }

        .story-media-side:hover .main-media-img {
          transform: scale(1.02) !important;
        }

        /* Floating overlapping secondary layout detail card */
        .overlapping-detail-box {
          position: absolute !important;
          bottom: -25px !important;
          left: -15px !important;
          background-color: #2a2022 !important; /* Deep accent matching espresso theme */
          padding: 22px 26px !important;
          max-width: 190px !important;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4) !important;
          border-top: 2px solid #e5b3b9 !important;
        }

        .detail-box-num {
          font-family: "Playfair Display", "Georgia", serif !important;
          font-size: 32px !important; /* Increased dimension */
          color: #e5b3b9 !important;
          font-weight: 400 !important;
          line-height: 1 !important;
          margin-bottom: 6px !important;
        }

        .detail-box-txt {
          font-size: 11.5px !important;
          color: #ffffff !important;
          letter-spacing: 0.05em !important;
          line-height: 1.4 !important;
        }

        /* --- RESPONSIVE TRANSLATIONS --- */
        @media (max-width: 968px) {
          .luxury-story-section {
            padding: 80px 24px !important;
          }
          .luxury-story-container {
            flex-direction: column !important;
            gap: 55px !important;
          }
          .story-content-side, .story-media-side {
            width: 100% !important;
            flex: none !important;
          }
          .main-media-frame {
            width: 100% !important;
            aspect-ratio: unset !important;
          }
          .overlapping-detail-box {
            bottom: 20px !important;
            left: 20px !important;
          }
        }

        @media (max-width: 640px) {
          .luxury-story-section { padding: 60px 16px !important; }
          .story-main-title { font-size: 32px !important; }
          .story-body-text { font-size: 14.5px !important; margin-bottom: 16px !important; }
          .story-perks-list { flex-direction: column !important; gap: 2px !important; margin-bottom: 22px !important; }
          .perk-item { padding-left: 14px !important; }
          .perk-title { margin-bottom: 1px !important; }
          .perk-desc { line-height: 1.3 !important; }
        }
      `,
        },
      }),
      (0, G.jsx)(`section`, {
        className: `luxury-story-section`,
        id: `brand-craftsmanship`,
        children: (0, G.jsxs)(`div`, {
          className: `luxury-story-container`,
          children: [
            (0, G.jsxs)(`div`, {
              className: `story-content-side`,
              children: [
                (0, G.jsx)(`span`, {
                  className: `story-accent-tag`,
                  children: `The Art of Looming`,
                }),
                (0, G.jsx)(`h2`, {
                  className: `story-main-title`,
                  children: `Celebrating Handloom Craftsmanship`,
                }),
                (0, G.jsx)(`p`, {
                  className: `story-body-text`,
                  children: `Every Padmini Vastra saree is a product of love, patience, and generations of weaving heritage. Sourced directly from rural Indian weaving clusters, our artisans use conventional wooden handlooms to create authentic Kalyani Cotton, Mulcotton, Linen, and Silk sarees of unmatched grace and breathability.`,
                }),
                (0, G.jsxs)(`ul`, {
                  className: `story-perks-list`,
                  children: [
                    (0, G.jsxs)(`li`, {
                      className: `perk-item`,
                      children: [
                        (0, G.jsx)(`h4`, {
                          className: `perk-title`,
                          children: `Hand-woven Zari`,
                        }),
                        (0, G.jsx)(`p`, {
                          className: `perk-desc`,
                          children: `Intricate borders woven by hand with gold and silver thread.`,
                        }),
                      ],
                    }),
                    (0, G.jsxs)(`li`, {
                      className: `perk-item`,
                      children: [
                        (0, G.jsx)(`h4`, {
                          className: `perk-title`,
                          children: `100% Pure Organic Dyes`,
                        }),
                        (0, G.jsx)(`p`, {
                          className: `perk-desc`,
                          children: `Skin-safe natural colorings sourced from organic minerals.`,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, G.jsx)(x, {
                  to: `/products`,
                  className: `story-cta-btn`,
                  children: `Explore Our Products`,
                }),
              ],
            }),
            (0, G.jsxs)(`div`, {
              className: `story-media-side`,
              children: [
                (0, G.jsx)(`div`, {
                  className: `main-media-frame`,
                  children: (0, G.jsx)(`img`, {
                    src: `https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=800`,
                    alt: `Authentic Handloom Saree Weaving Craftsmanship`,
                    className: `main-media-img`,
                  }),
                }),
                (0, G.jsxs)(`div`, {
                  className: `overlapping-detail-box`,
                  children: [
                    (0, G.jsx)(`div`, {
                      className: `detail-box-num`,
                      children: `700+`,
                    }),
                    (0, G.jsx)(`div`, {
                      className: `detail-box-txt`,
                      children: `Premium Thread Count & Density Threshold`,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function $e() {
  let [e, t] = (0, B.useState)(0),
    n = [
      {
        id: 0,
        text: `I recently bought cherry color Mul Cotton saree. I must say firstly i was nervous for purchasing online but i am v. Happy with the quality and look of the fabric. Will purchase more in coming`,
        author: `Ritu Khanna`,
      },
      {
        id: 1,
        text: `The Kalyani cotton and soft silk sarees are exceptionally light and premium. Even after multiple wears, the handloom fabric retains its soft texture and graceful fall.`,
        author: `Ananya Sharma`,
      },
      {
        id: 2,
        text: `Stunning thread craftsmanship on the Gini Tissue saree! It feels incredibly lightweight yet provides a highly elegant and premium look. Highly recommend their handloom collections.`,
        author: `Vikram Malhotra`,
      },
    ];
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        dangerouslySetInnerHTML: {
          __html: `
        .testimonials-section {
          background-color: #ffffff !important;
          padding: 80px 24px 60px 24px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          text-align: center !important;
        }

        .testimonials-container {
          max-width: 850px !important;
          margin: 0 auto !important;
          position: relative !important;
        }

        /* Matches the clean title header block from your reference image */
        .testimonials-heading {
          font-family: "Playfair Display", "Didot", "Georgia", serif !important;
          font-size: 32px !important;
          font-weight: 500 !important;
          color: #111111 !important;
          margin: 0 0 20px 0 !important;
          letter-spacing: 0.02em !important;
        }

        /* Centered signature micro orange-rose stars row */
        .testimonials-stars {
          display: flex !important;
          justify-content: center !important;
          gap: 4px !important;
          margin-bottom: 28px !important;
        }

        .testimonial-star-item {
          color: #fca27e !important; /* Muted orange-peach star tone from image_4b1ffd.png */
          font-size: 13px !important;
        }

        /* Immersive layout wrapper with animation transitions */
        .testimonial-card-viewport {
          min-height: 120px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .testimonial-quote-text {
          font-size: 18px !important;
          line-height: 1.6 !important;
          color: #2c2c2c !important;
          font-weight: 400 !important;
          margin: 0 auto 24px auto !important;
          max-width: 720px !important;
          letter-spacing: 0.01em !important;
          animation: testimonialFadeIn 0.4s ease-in-out;
        }

        .testimonial-author-name {
          font-size: 12px !important;
          font-weight: 500 !important;
          color: #555555 !important;
          letter-spacing: 0.05em !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          margin: 0 !important;
          animation: testimonialFadeIn 0.4s ease-in-out;
        }

        /* Carousel dot indicators */
        .testimonial-carousel-dots {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 14px !important;
          margin-top: 40px !important;
        }

        .carousel-dot-trigger {
          width: 7px !important;
          height: 7px !important;
          border-radius: 50% !important;
          background-color: #9b9b9b !important; /* Muted gray dots */
          border: none !important;
          padding: 0 !important;
          cursor: pointer !important;
          transition: all 0.25s ease !important;
          position: relative !important;
        }

        /* Active dot style matching Labham's open ring format overlay */
        .carousel-dot-trigger.is-active {
          background-color: #111111 !important;
          transform: scale(1.1) !important;
        }

        .carousel-dot-trigger.is-active::after {
          content: '' !important;
          position: absolute !important;
          inset: -4px !important;
          border: 1px solid #111111 !important;
          border-radius: 50% !important;
        }

        @keyframes testimonialFadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .testimonials-heading { font-size: 26px !important; }
          .testimonial-quote-text { font-size: 15px !important; line-height: 1.5 !important; }
          .testimonials-section { padding: 60px 16px 40px 16px !important; }
        }
      `,
        },
      }),
      (0, G.jsx)(`section`, {
        className: `testimonials-section`,
        id: `customer-testimonials`,
        children: (0, G.jsxs)(`div`, {
          className: `testimonials-container`,
          children: [
            (0, G.jsx)(`h2`, {
              className: `testimonials-heading`,
              children: `Testimonials`,
            }),
            (0, G.jsx)(`div`, {
              className: `testimonials-stars`,
              children: [1, 2, 3, 4, 5].map((e) =>
                (0, G.jsx)(
                  `span`,
                  { className: `testimonial-star-item`, children: `★` },
                  e,
                ),
              ),
            }),
            (0, G.jsx)(`div`, {
              className: `testimonial-card-viewport`,
              children: (0, G.jsxs)(
                `div`,
                {
                  children: [
                    (0, G.jsxs)(`p`, {
                      className: `testimonial-quote-text`,
                      children: [`"`, n[e].text, `"`],
                    }),
                    (0, G.jsxs)(`h4`, {
                      className: `testimonial-author-name`,
                      children: [
                        (0, G.jsx)(`span`, { children: `—` }),
                        ` `,
                        n[e].author,
                      ],
                    }),
                  ],
                },
                e,
              ),
            }),
            (0, G.jsx)(`div`, {
              className: `testimonial-carousel-dots`,
              children: n.map((n) =>
                (0, G.jsx)(
                  `button`,
                  {
                    onClick: () => t(n.id),
                    className: `carousel-dot-trigger ${e === n.id ? `is-active` : ``}`,
                    "aria-label": `Go to testimonial slider slot index ${n.id + 1}`,
                  },
                  n.id,
                ),
              ),
            }),
          ],
        }),
      }),
    ],
  });
}
function et({
  children: e,
  direction: t = `up`,
  delay: n = 0,
  duration: r = 750,
  distance: i = 32,
  threshold: a = 0.1,
  once: o = !0,
  style: s = {},
  className: c = ``,
}) {
  let l = (0, B.useRef)(null),
    u = (0, B.useRef)(!1);
  (0, B.useEffect)(() => {
    let e = l.current;
    if (!e) return;
    let r = () => {
        setTimeout(() => {
          ((e.style.opacity = `1`),
            (e.style.transform = `none`),
            (e.style.filter = `none`),
            (e.style.visibility = `visible`));
        }, n);
      },
      i = new IntersectionObserver(
        ([n]) => {
          if (n.isIntersecting) {
            if (o && u.current) return;
            ((u.current = !0), r(), o && i.unobserve(e));
          } else
            o ||
              ((e.style.opacity = `0`),
              (e.style.transform = d[t] || d.up),
              (e.style.filter = t === `fade` ? `blur(4px)` : `none`));
        },
        { threshold: a, rootMargin: `0px 0px -32px 0px` },
      );
    return (i.observe(e), () => i.disconnect());
  }, [n, a]);
  let d = {
    up: `translateY(${i}px)`,
    down: `translateY(-${i}px)`,
    left: `translateX(-${i}px)`,
    right: `translateX(${i}px)`,
    fade: `scale(0.96)`,
  };
  return (0, G.jsx)(`div`, {
    ref: l,
    style: {
      opacity: 0,
      visibility: `visible`,
      transform: d[t] || d.up,
      filter: t === `fade` ? `blur(6px)` : `none`,
      transition: [
        `opacity   ${r}ms cubic-bezier(0.22,1,0.36,1)`,
        `transform ${r}ms cubic-bezier(0.22,1,0.36,1)`,
        `filter    ${Math.round(r * 0.8)}ms ease`,
      ].join(`, `),
      willChange: `opacity, transform`,
      ...s,
    },
    className: c,
    children: e,
  });
}
function tt() {
  let [e, t] = (0, B.useState)([]),
    n = d();
  (0, B.useEffect)(() => {
    fetch(`${H}/products?v=nocache`)
      .then((e) => e.json())
      .then(t)
      .catch(console.error);
  }, []);
  let r = () => n(`/products`);
  return (0, G.jsx)(`div`, {
    className: `site-root`,
    children: (0, G.jsxs)(`main`, {
      children: [
        (0, G.jsx)(qe, {}),
        (0, G.jsx)(et, {
          direction: `up`,
          duration: 550,
          distance: 24,
          children: (0, G.jsx)(Ye, {}),
        }),
        (0, G.jsx)(et, {
          direction: `up`,
          duration: 700,
          distance: 40,
          delay: 50,
          children: (0, G.jsx)(Xe, { products: e, onSelectProduct: r }),
        }),
        (0, G.jsx)(et, {
          direction: `up`,
          duration: 700,
          distance: 36,
          delay: 60,
          children: (0, G.jsx)(Ze, { products: e, onSelectProduct: r }),
        }),
        (0, G.jsx)(et, {
          direction: `left`,
          duration: 850,
          distance: 48,
          children: (0, G.jsx)(Qe, {}),
        }),
        (0, G.jsx)(et, {
          direction: `fade`,
          duration: 700,
          delay: 40,
          children: (0, G.jsx)($e, {}),
        }),
      ],
    }),
  });
}
function nt() {
  let [e, t] = (0, B.useState)([]),
    [n, r] = (0, B.useState)(!0),
    [i, o] = (0, B.useState)(``);
  return (
    (0, B.useEffect)(() => {
      (async () => {
        let e = localStorage.getItem(`token`);
        if (!e) {
          (o(`Please log in to view your luxury linen order history.`), r(!1));
          return;
        }
        try {
          let n = await fetch(`${H}/orders`, {
              method: `GET`,
              headers: { Authorization: `Bearer ${e}` },
            }),
            r = await n.json();
          n.ok
            ? t(r.orders || [])
            : o(r.error || `Failed to populate active purchase records.`);
        } catch (e) {
          (console.error(`Order database compilation connection error:`, e),
            o(
              `Database cluster connection failure. Verify your backend server configuration.`,
            ));
        } finally {
          r(!1);
        }
      })();
    }, []),
    n
      ? (0, G.jsx)(`div`, {
          style: {
            padding: `120px 20px`,
            textAlign: `center`,
            fontFamily: `sans-serif`,
            color: `#7c7c75`,
          },
          children: (0, G.jsx)(`h3`, {
            children: `Assembling your premium order records...`,
          }),
        })
      : (0, G.jsxs)(G.Fragment, {
          children: [
            (0, G.jsx)(`style`, {
              children: `
        .orders-page-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1c1c1a;
          min-height: 70vh;
        }

        .orders-back-nav {
          margin-bottom: 20px;
        }

        .orders-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #7c7c75;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .orders-back-btn:hover { color: #1c1c1a; }

        .orders-page-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 500;
          margin-bottom: 30px;
          border-bottom: 1px solid #ebebeb;
          padding-bottom: 15px;
        }

        .error-message-box {
          background: #fef2f2;
          border: 1px solid #fee2e2;
          color: #991b1b;
          padding: 16px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .order-card-wrapper {
          background: #ffffff;
          border: 1px solid #ebebeb;
          border-radius: 12px;
          margin-bottom: 30px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.01);
        }

        .order-card-header {
          background: #fafaf7;
          border-bottom: 1px solid #ebebeb;
          padding: 16px 24px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 16px;
          font-size: 13px;
          color: #7c7c75;
        }

        .header-meta-group {
          display: flex;
          gap: 24px;
        }

        .meta-item label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
          color: #bcbcb8;
        }

        .meta-item span {
          color: #1c1c1a;
          font-weight: 500;
        }

        .order-id-display {
          text-align: right;
        }

        .order-card-body {
          padding: 24px;
        }

        .order-item-row {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid #f5f5f5;
        }
        .order-item-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .order-item-row:first-child {
          padding-top: 0;
        }

        .order-item-img {
          width: 80px;
          aspect-ratio: 1 / 1;
          background: #fafaf7;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #f0f0f0;
        }
        .order-item-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .order-item-details h4 {
          margin: 0 0 4px 0;
          font-size: 15px;
          font-weight: 500;
          color: #1c1c1a;
        }

        .order-item-meta {
          font-size: 12px;
          color: #7c7c75;
        }

        .order-item-price {
          font-weight: 500;
          font-size: 15px;
          color: #1c1c1a;
        }

        .order-card-empty {
          text-align: center;
          padding: 60px 20px;
        }
        .empty-icon-box {
          color: #bcbcb8;
          margin-bottom: 16px;
        }
        .empty-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          margin-bottom: 8px;
        }
        .empty-text {
          color: #7c7c75;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .shop-btn-luxury {
          background: #1c1c1a;
          color: #ffffff;
          border: none;
          padding: 12px 28px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
        }
        .shop-btn-luxury:hover { background: #3d3d3a; }

        @media (max-width: 600px) {
          .orders-page-container { padding: 24px 14px 60px; }
          .orders-page-title { font-size: 1.8rem; padding-bottom: 12px; margin-bottom: 20px; }
          .order-card-header { padding: 12px 16px; gap: 10px; }
          .header-meta-group { gap: 14px; flex-wrap: wrap; }
          .order-card-body { padding: 14px 16px; }
          .order-item-row { grid-template-columns: 60px 1fr; gap: 12px; }
          .order-item-img { width: 60px; }
          .order-item-price { display: none; }
          .order-item-details h4 { font-size: 13px; }
          .order-id-display { width: 100%; text-align: left; }
        }
      `,
            }),
            (0, G.jsxs)(`div`, {
              className: `orders-page-container`,
              children: [
                (0, G.jsx)(`div`, {
                  className: `orders-back-nav`,
                  children: (0, G.jsxs)(x, {
                    to: `/`,
                    className: `orders-back-btn`,
                    children: [(0, G.jsx)(ue, { size: 14 }), ` Back to Home`],
                  }),
                }),
                (0, G.jsx)(`h1`, {
                  className: `orders-page-title`,
                  children: `My Orders`,
                }),
                i &&
                  (0, G.jsxs)(`div`, {
                    className: `error-message-box`,
                    children: [`⚠️ `, i],
                  }),
                e.length === 0
                  ? (0, G.jsxs)(`div`, {
                      className: `order-card-empty`,
                      children: [
                        (0, G.jsx)(`div`, {
                          className: `empty-icon-box`,
                          children: (0, G.jsx)(k, {
                            size: 48,
                            strokeWidth: 1.5,
                          }),
                        }),
                        (0, G.jsx)(`h2`, {
                          className: `empty-headline`,
                          children: `No Orders Found`,
                        }),
                        (0, G.jsx)(`p`, {
                          className: `empty-text`,
                          children: `You haven't placed any premium orders with us yet.`,
                        }),
                        (0, G.jsx)(x, {
                          to: `/products`,
                          className: `shop-btn-luxury`,
                          children: `Explore Collections`,
                        }),
                      ],
                    })
                  : e.map((e) =>
                      (0, G.jsxs)(
                        `div`,
                        {
                          className: `order-card-wrapper`,
                          children: [
                            (0, G.jsxs)(`div`, {
                              className: `order-card-header`,
                              children: [
                                (0, G.jsxs)(`div`, {
                                  className: `header-meta-group`,
                                  children: [
                                    (0, G.jsxs)(`div`, {
                                      className: `meta-item`,
                                      children: [
                                        (0, G.jsxs)(`label`, {
                                          children: [
                                            (0, G.jsx)(l, {
                                              size: 10,
                                              style: { marginRight: 4 },
                                            }),
                                            ` Date Placed`,
                                          ],
                                        }),
                                        (0, G.jsx)(`span`, {
                                          children: new Date(
                                            e.createdAt,
                                          ).toLocaleDateString(`en-IN`, {
                                            day: `numeric`,
                                            month: `long`,
                                            year: `numeric`,
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, G.jsxs)(`div`, {
                                      className: `meta-item`,
                                      children: [
                                        (0, G.jsxs)(`label`, {
                                          children: [
                                            (0, G.jsx)(a, {
                                              size: 10,
                                              style: { marginRight: 2 },
                                            }),
                                            ` Total Amount`,
                                          ],
                                        }),
                                        (0, G.jsxs)(`span`, {
                                          children: [
                                            `₹`,
                                            e.totalAmount.toLocaleString(
                                              `en-IN`,
                                              { minimumFractionDigits: 2 },
                                            ),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, G.jsxs)(`div`, {
                                      className: `meta-item`,
                                      children: [
                                        (0, G.jsxs)(`label`, {
                                          children: [
                                            (0, G.jsx)(le, {
                                              size: 10,
                                              style: { marginRight: 4 },
                                            }),
                                            ` Status`,
                                          ],
                                        }),
                                        (0, G.jsx)(`span`, {
                                          style: {
                                            color:
                                              e.status === `Paid`
                                                ? `#166534`
                                                : `#8b7355`,
                                            textTransform: `uppercase`,
                                            fontSize: `12px`,
                                            fontWeight: 600,
                                          },
                                          children: e.status,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, G.jsxs)(`div`, {
                                  className: `order-id-display meta-item`,
                                  children: [
                                    (0, G.jsx)(`label`, {
                                      children: `Order Reference ID`,
                                    }),
                                    (0, G.jsxs)(`span`, {
                                      style: {
                                        fontFamily: `monospace`,
                                        color: `#7c7c75`,
                                      },
                                      children: [`#`, e.razorpayOrderId],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, G.jsx)(`div`, {
                              className: `order-card-body`,
                              children: e.items.map((e, t) =>
                                (0, G.jsxs)(
                                  `div`,
                                  {
                                    className: `order-item-row`,
                                    children: [
                                      (0, G.jsx)(`div`, {
                                        className: `order-item-img`,
                                        children: (0, G.jsx)(`img`, {
                                          src:
                                            e.image ||
                                            `https://placehold.co/150x150?text=Bedding`,
                                          alt: e.name,
                                        }),
                                      }),
                                      (0, G.jsxs)(`div`, {
                                        className: `order-item-details`,
                                        children: [
                                          (0, G.jsx)(`h4`, {
                                            children: e.name,
                                          }),
                                          (0, G.jsxs)(`div`, {
                                            className: `order-item-meta`,
                                            children: [
                                              (0, G.jsxs)(`div`, {
                                                children: [
                                                  `Variant: `,
                                                  e.variant || `Standard`,
                                                ],
                                              }),
                                              (0, G.jsxs)(`div`, {
                                                children: [
                                                  `Quantity: `,
                                                  e.quantity,
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, G.jsxs)(`div`, {
                                        className: `order-item-price`,
                                        children: [
                                          `₹`,
                                          (e.price * e.quantity).toLocaleString(
                                            `en-IN`,
                                            { minimumFractionDigits: 2 },
                                          ),
                                        ],
                                      }),
                                    ],
                                  },
                                  e._id || t,
                                ),
                              ),
                            }),
                          ],
                        },
                        e._id,
                      ),
                    ),
              ],
            }),
          ],
        })
  );
}
var rt = {
    "best-sellers": {
      category: [],
      subcategory: [],
      label: `Best Sellers`,
      breadcrumb: [],
    },
    "kalyani-cotton-saree": {
      category: [`kalyani-cotton-saree`],
      subcategory: [],
      label: `Kalyani Cotton Saree`,
      breadcrumb: [],
    },
    "khadi-embroidery-saree": {
      category: [`khadi-embroidery-saree`],
      subcategory: [],
      label: `Khadi Embroidery Saree`,
      breadcrumb: [],
    },
    "mul-cotton-saree": {
      category: [`mul-cotton-saree`],
      subcategory: [],
      label: `Mul Cotton Saree`,
      breadcrumb: [],
    },
    "gini-tissue-saree": {
      category: [`gini-tissue-saree`],
      subcategory: [],
      label: `Gini Tissue Saree`,
      breadcrumb: [],
    },
    "plain-soft-silk-saree": {
      category: [`plain-soft-silk-saree`],
      subcategory: [],
      label: `Plain Soft Silk Saree`,
      breadcrumb: [],
    },
    "border-less-soft-silk-saree": {
      category: [`border-less-soft-silk-saree`],
      subcategory: [],
      label: `Border less Soft Silk Saree`,
      breadcrumb: [],
    },
    "champion-silk-saree": {
      category: [`champion-silk-saree`],
      subcategory: [],
      label: `Champion Silk Saree`,
      breadcrumb: [],
    },
    "soft-silk-saree": {
      category: [`soft-silk-saree`],
      subcategory: [],
      label: `Soft Silk Saree`,
      breadcrumb: [],
    },
    "ds-kottanchi-saree": {
      category: [`ds-kottanchi-saree`],
      subcategory: [],
      label: `Ds Kottanchi Saree`,
      breadcrumb: [],
    },
  },
  it = {
    "kalyani-cotton-saree": `Kalyani Cotton Saree`,
    "khadi-embroidery-saree": `Khadi Embroidery Saree`,
    "mul-cotton-saree": `Mul Cotton Saree`,
    "gini-tissue-saree": `Gini Tissue Saree`,
    "plain-soft-silk-saree": `Plain Soft Silk Saree`,
    "border-less-soft-silk-saree": `Border less Soft Silk Saree`,
    "champion-silk-saree": `Champion Silk Saree`,
    "soft-silk-saree": `Soft Silk Saree`,
    "ds-kottanchi-saree": `Ds Kottanchi Saree`,
  };
function at({ product: e, isLiked: t, onToggleWishlist: n }) {
  let r = e.stock === 0,
    [i, a] = (0, B.useState)(!1),
    [o, s] = (0, B.useState)(!1);
  return (0, G.jsxs)(`div`, {
    className: `towels-product-card${r ? ` card-disabled` : ``}`,
    children: [
      (0, G.jsxs)(`div`, {
        className: `towels-img-wrap`,
        children: [
          (0, G.jsx)(x, {
            to: `/product/${e._id}`,
            children: (0, G.jsx)(`img`, {
              src: e.image,
              alt: e.name,
              className: `towels-img`,
            }),
          }),
          r
            ? (0, G.jsx)(`span`, {
                className: `towels-badge-out-of-stock`,
                children: `OUT OF STOCK`,
              })
            : e.discountPercent > 0 &&
              (0, G.jsxs)(`span`, {
                className: `towels-badge-discount`,
                children: [`SAVE `, e.discountPercent, `%`],
              }),
          (0, G.jsx)(`button`, {
            className: `towels-wishlist-btn`,
            onClick: () => n(e._id),
            "aria-label": `Toggle Wishlist`,
            children: (0, G.jsx)(h, {
              size: 18,
              fill: t ? `#a61d24` : `none`,
              stroke: t ? `#a61d24` : `#222222`,
              style: { transition: `all 0.2s ease` },
            }),
          }),
          !r &&
            (0, G.jsx)(x, {
              to: `/product/${e._id}`,
              className: `towels-view-overlay`,
              children: `View Product →`,
            }),
        ],
      }),
      (0, G.jsxs)(`div`, {
        className: `towels-card-body`,
        children: [
          (0, G.jsx)(`div`, {
            className: `towels-card-name`,
            children: e.name,
          }),
          (0, G.jsxs)(`div`, {
            className: `towels-card-price-row`,
            children: [
              (0, G.jsxs)(`div`, {
                style: { display: `flex`, alignItems: `baseline`, gap: `8px` },
                children: [
                  (0, G.jsxs)(`span`, {
                    className: `towels-card-price`,
                    children: [`Rs. `, Number(e.discountPrice).toFixed(2)],
                  }),
                  e.discountPrice < e.price &&
                    (0, G.jsxs)(`span`, {
                      className: `towels-card-price-original`,
                      children: [`Rs. `, Number(e.price).toFixed(2)],
                    }),
                ],
              }),
              (0, G.jsx)(`span`, {
                style: { fontSize: `10px`, color: `#888`, marginTop: `4px` },
                children: r ? `Unavailable` : `Only ${e.stock} left`,
              }),
            ],
          }),
          (0, G.jsx)(`button`, {
            className: `towels-add-cart-btn`,
            onClick: async (t) => {
              if ((t.preventDefault(), t.stopPropagation(), r || i)) return;
              let n = localStorage.getItem(`token`);
              if (!n) {
                (he(e, 1), s(!0), setTimeout(() => s(!1), 1500));
                return;
              }
              a(!0);
              try {
                if (
                  !(
                    await fetch(`/api/index.php/cart/add`, {
                      method: `POST`,
                      headers: {
                        "Content-Type": `application/json`,
                        Authorization: `Bearer ${n}`,
                      },
                      body: JSON.stringify({ productId: e._id, quantity: 1 }),
                    })
                  ).ok
                )
                  throw Error(`Failed to add to cart`);
                (s(!0), setTimeout(() => s(!1), 1500));
              } catch {
              } finally {
                a(!1);
              }
            },
            disabled: r || i,
            children: r
              ? `Out of Stock`
              : i
                ? `Adding…`
                : o
                  ? `Added ✓`
                  : `Add to Cart`,
          }),
        ],
      }),
    ],
  });
}
function ot() {
  let { category: e } = re(),
    [t] = u(),
    n = t.get(`size`),
    r = (t.get(`q`) || ``).trim(),
    [a, o] = (0, B.useState)([]),
    [s, c] = (0, B.useState)([]),
    [l, d] = (0, B.useState)(!0),
    [f, m] = (0, B.useState)(null),
    [h, g] = (0, B.useState)(`best-selling`),
    [_, v] = (0, B.useState)(!1);
  (0, B.useEffect)(
    () => (
      (document.body.style.overflow = _ ? `hidden` : ``),
      () => {
        document.body.style.overflow = ``;
      }
    ),
    [_],
  );
  let [y, b] = (0, B.useState)({
    productType: [],
    size: [],
    minPrice: 0,
    maxPrice: 6e3,
  });
  ((0, B.useEffect)(() => {
    b({
      productType: [],
      size: n ? [n.toLowerCase()] : [],
      minPrice: 0,
      maxPrice: 6e3,
    });
  }, [e, n]),
    (0, B.useEffect)(() => {
      (async () => {
        try {
          d(!0);
          let e = await fetch(`${H}/products?v=nocache`);
          if (!e.ok) throw Error(`Failed to fetch products.`);
          o(await e.json());
          let t = localStorage.getItem(`token`);
          if (t) {
            let e = await fetch(`${H}/wishlist`, {
              headers: { Authorization: `Bearer ${t}` },
            });
            e.ok && c((await e.json()).map((e) => e._id || e));
          }
        } catch (e) {
          m(e.message);
        } finally {
          d(!1);
        }
      })();
    }, []));
  let S = async (e) => {
      let t = localStorage.getItem(`token`);
      if (!t) {
        alert(`Please log in to add to wishlist.`);
        return;
      }
      let n = s.includes(e);
      c((t) => (n ? t.filter((t) => t !== e) : [...t, e]));
      try {
        (
          await fetch(`/api/index.php/wishlist/toggle`, {
            method: `POST`,
            headers: {
              "Content-Type": `application/json`,
              Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify({ productId: e }),
          })
        ).ok || c((t) => (n ? [...t, e] : t.filter((t) => t !== e)));
      } catch {
        c((t) => (n ? [...t, e] : t.filter((t) => t !== e)));
      }
    },
    C = (0, B.useMemo)(
      () =>
        rt[e] || {
          category: [],
          subcategory: [],
          label: `All Products`,
          breadcrumb: [],
        },
      [e],
    ),
    w = (0, B.useMemo)(
      () =>
        a.filter((e) => {
          let t = (e.category || ``).toLowerCase(),
            n = (e.subcategory || ``).toLowerCase();
          return !(
            (C.category.length && !C.category.includes(t)) ||
            (C.subcategory.length && !C.subcategory.includes(n))
          );
        }),
      [a, C],
    ),
    T = (0, B.useMemo)(
      () =>
        w.reduce(
          (e, t) => {
            let n = t.category?.toLowerCase();
            return (n && e[n] !== void 0 && e[n]++, e);
          },
          {
            "kalyani-cotton-saree": 0,
            "khadi-embroidery-saree": 0,
            "mul-cotton-saree": 0,
            "gini-tissue-saree": 0,
            "plain-soft-silk-saree": 0,
            "border-less-soft-silk-saree": 0,
            "champion-silk-saree": 0,
            "soft-silk-saree": 0,
            "ds-kottanchi-saree": 0,
          },
        ),
      [w],
    ),
    E = (0, B.useMemo)(() => {
      let e = new Set();
      return (
        w.forEach((t) => {
          t.size?.trim() && e.add(t.size.trim());
        }),
        [...e].sort()
      );
    }, [w]),
    D = (e, t) =>
      b((n) => ({
        ...n,
        [e]: n[e].includes(t) ? n[e].filter((e) => e !== t) : [...n[e], t],
      })),
    O = (0, B.useMemo)(() => {
      let e = [...w];
      if (r) {
        let t = r.toLowerCase();
        e = e.filter(
          (e) =>
            (e.name || ``).toLowerCase().includes(t) ||
            (e.subcategory || ``).toLowerCase().includes(t) ||
            (e.category || ``).toLowerCase().includes(t) ||
            (e.size || ``).toLowerCase().includes(t),
        );
      }
      return (
        y.productType.length &&
          (e = e.filter((e) =>
            y.productType.includes((e.category || ``).toLowerCase()),
          )),
        y.size.length &&
          (e = e.filter((e) => {
            let t = (e.size || ``).trim().toLowerCase();
            return y.size.some((e) => t.includes(e.toLowerCase()));
          })),
        (e = e.filter((e) => {
          let t = Number(e.discountPrice ?? e.price ?? 0);
          return t >= y.minPrice && t <= y.maxPrice;
        })),
        h === `price-asc` &&
          e.sort(
            (e, t) =>
              (e.discountPrice || e.price) - (t.discountPrice || t.price),
          ),
        h === `price-desc` &&
          e.sort(
            (e, t) =>
              (t.discountPrice || t.price) - (e.discountPrice || e.price),
          ),
        e
      );
    }, [w, r, y, h]),
    k =
      C.category.length === 0
        ? [
            `kalyani-cotton-saree`,
            `khadi-embroidery-saree`,
            `mul-cotton-saree`,
            `gini-tissue-saree`,
            `plain-soft-silk-saree`,
            `border-less-soft-silk-saree`,
            `champion-silk-saree`,
            `soft-silk-saree`,
            `ds-kottanchi-saree`,
          ]
        : C.category.length > 1
          ? C.category
          : [];
  return (0, G.jsxs)(G.Fragment, {
    children: [
      (0, G.jsx)(`style`, {
        children: `
        .cat-page { max-width: 100vw; background: #fff; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #333; padding: 24px 40px 60px; }

        /* Breadcrumb */
        .cat-breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #bcbcb8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 18px; flex-wrap: wrap; }
        .cat-breadcrumb a { color: inherit; text-decoration: none; transition: color 0.15s; }
        .cat-breadcrumb a:hover { color: #1c1c1a; }
        .cat-breadcrumb span { color: #1c1c1a; font-weight: 500; }

        /* Page title */
        .cat-page-title { font-size: 22px; font-weight: 600; letter-spacing: -0.01em; color: #1c1c1a; margin: 0 0 20px; }

        /* Top bar */
        .towels-top-bar { display: flex; justify-content: space-between; align-items: center; padding: 10px 0 20px; border-bottom: 1px solid #f2f2f2; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #222; }
        .towels-sort-select { border: none; background: transparent; font-size: 11px; text-transform: uppercase; cursor: pointer; outline: none; color: #222; }

        /* Layout */
        .towels-main-layout { display: grid; grid-template-columns: 220px 1fr; gap: 40px; margin-top: 28px; align-items: start; }

        /* Sidebar */
        .towels-sidebar { font-size: 12px; letter-spacing: 0.02em; position: sticky; top: 80px; }
        .towels-filter-group { margin-bottom: 22px; border-bottom: 1px solid #f5f5f5; padding-bottom: 18px; }
        .towels-filter-title { font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.08em; margin-bottom: 14px; color: #222; }
        .towels-filter-option { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer; color: #555; user-select: none; }
        .towels-filter-option input { accent-color: #222; cursor: pointer; }
        .towels-count-sup { font-size: 9px; color: #aaa; margin-left: 3px; }
        .towels-price-inputs { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
        .towels-price-field { display: flex; align-items: center; border: 1px solid #dcdcdc; padding: 6px 10px; width: 90px; background: #fff; }
        .towels-price-field input { width: 100%; border: none; outline: none; font-size: 11px; color: #333; }
        .towels-clear-btn { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; cursor: pointer; background: none; border: none; padding: 0; margin-top: 16px; text-decoration: underline; display: block; }
        .towels-clear-btn:hover { color: #333; }

        /* Product grid */
        .towels-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

        /* Product card */
        .towels-product-card { background: #fff; display: flex; flex-direction: column; }
        .card-disabled { opacity: 0.6; }
        .towels-img-wrap { position: relative; width: 100%; aspect-ratio: 3 / 4; overflow: hidden; background: #f7f7f7; }
        .towels-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .towels-product-card:hover .towels-img { transform: scale(1.04); }
        .towels-badge-discount { position: absolute; top: 10px; left: 10px; background: #a61d24; color: #fff; font-size: 9px; font-weight: 700; padding: 4px 8px; border-radius: 10px; }
        .towels-badge-out-of-stock { position: absolute; top: 10px; left: 10px; background: #555; color: #fff; font-size: 9px; font-weight: 700; padding: 4px 8px; border-radius: 10px; }
        .towels-wishlist-btn { position: absolute; top: 10px; right: 10px; background: #fff; border: none; border-radius: 50%; padding: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.12); transition: transform 0.15s; }
        .towels-wishlist-btn:hover { transform: scale(1.12); }
        .towels-view-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(28,28,26,0.82); color: #fff;
          text-align: center; padding: 11px 8px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
          transform: translateY(100%); transition: transform 0.28s ease;
          backdrop-filter: blur(2px);
        }
        .towels-product-card:hover .towels-view-overlay { transform: translateY(0); }
        .towels-card-body { padding: 12px 0 6px; font-size: 12px; line-height: 1.4; }
        .towels-card-name { color: #222; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .towels-card-price-row { display: flex; flex-direction: column; gap: 2px; }
        .towels-card-price { color: #222; font-weight: 500; }
        .towels-card-price-original { color: #aaa; text-decoration: line-through; font-size: 11px; }
        .towels-add-cart-btn {
          margin-top: 10px; width: 100%; padding: 9px 12px;
          background: #1c1c1a; color: #fff; border: 1px solid #1c1c1a;
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s ease, color 0.2s ease;
        }
        .towels-add-cart-btn:hover:not(:disabled) { background: #fff; color: #1c1c1a; }
        .towels-add-cart-btn:disabled { background: #ddddd8; color: #9ca3af; border-color: #ddddd8; cursor: not-allowed; }

        /* States */
        .towels-empty-state { grid-column: 1 / -1; text-align: center; padding: 80px 0; color: #888; font-size: 14px; }
        .towels-center-state { grid-column: 1 / -1; text-align: center; padding: 120px 0; font-size: 15px; color: #666; }

        /* Mobile filter button */
        .mobile-filter-btn {
          display: none; align-items: center; gap: 6px;
          padding: 7px 14px; background: #1c1c1a; color: #fff;
          border: none; border-radius: 6px; font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer;
          font-family: inherit;
        }

        /* Filter drawer backdrop */
        .filter-drawer-backdrop {
          display: none; position: fixed; inset: 0;
          background: rgba(0,0,0,0.45); z-index: 9000;
        }
        .filter-drawer-backdrop.open { display: block; }

        /* Filter drawer panel */
        .filter-drawer-panel {
          position: fixed; top: 0; left: 0; width: 85%; max-width: 320px;
          height: 100vh; background: #fff; z-index: 9001;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow-y: auto; display: flex; flex-direction: column;
          box-shadow: 4px 0 24px rgba(0,0,0,0.12);
        }
        .filter-drawer-panel.open { transform: translateX(0); }

        .filter-drawer-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 20px; border-bottom: 1px solid #f0f0f0;
          font-size: 14px; font-weight: 700; color: #1c1c1a;
          text-transform: uppercase; letter-spacing: 0.08em; flex-shrink: 0;
        }
        .filter-drawer-close {
          background: none; border: none; cursor: pointer; padding: 4px;
          color: #666; display: flex; align-items: center;
        }
        .filter-drawer-body { padding: 20px; flex: 1; }

        /* Responsive */
        @media (max-width: 1024px) {
          .towels-grid { grid-template-columns: repeat(2, 1fr); }
          .towels-main-layout { grid-template-columns: 1fr; }
          .towels-sidebar { display: none; }
          .mobile-filter-btn { display: flex; }
          .cat-page { padding: 16px 16px 80px; }
        }
        @media (max-width: 480px) {
          .towels-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .cat-page { padding: 12px 12px 80px; }
          .cat-page-title { font-size: 18px; margin-bottom: 14px; }
        }
      `,
      }),
      (0, G.jsx)(`div`, {
        className: `filter-drawer-backdrop${_ ? ` open` : ``}`,
        onClick: () => v(!1),
        "aria-hidden": `true`,
      }),
      (0, G.jsxs)(`div`, {
        className: `filter-drawer-panel${_ ? ` open` : ``}`,
        "aria-label": `Filters`,
        children: [
          (0, G.jsxs)(`div`, {
            className: `filter-drawer-head`,
            children: [
              `Filters`,
              (0, G.jsx)(`button`, {
                className: `filter-drawer-close`,
                onClick: () => v(!1),
                "aria-label": `Close filters`,
                children: (0, G.jsx)(N, { size: 20 }),
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `filter-drawer-body`,
            children: [
              k.length > 0 &&
                (0, G.jsxs)(`div`, {
                  className: `towels-filter-group`,
                  children: [
                    (0, G.jsx)(`div`, {
                      className: `towels-filter-title`,
                      children: `Product Type`,
                    }),
                    k.map((e) =>
                      (0, G.jsxs)(
                        `label`,
                        {
                          className: `towels-filter-option`,
                          children: [
                            (0, G.jsx)(`input`, {
                              type: `checkbox`,
                              checked: y.productType.includes(e),
                              onChange: () => D(`productType`, e),
                            }),
                            (0, G.jsxs)(`span`, {
                              children: [
                                it[e],
                                (0, G.jsx)(`sup`, {
                                  className: `towels-count-sup`,
                                  children: T[e] ?? 0,
                                }),
                              ],
                            }),
                          ],
                        },
                        e,
                      ),
                    ),
                  ],
                }),
              E.length > 0 &&
                (0, G.jsxs)(`div`, {
                  className: `towels-filter-group`,
                  children: [
                    (0, G.jsx)(`div`, {
                      className: `towels-filter-title`,
                      children: `Size`,
                    }),
                    E.map((e) =>
                      (0, G.jsxs)(
                        `label`,
                        {
                          className: `towels-filter-option`,
                          children: [
                            (0, G.jsx)(`input`, {
                              type: `checkbox`,
                              checked: y.size.includes(e),
                              onChange: () => D(`size`, e),
                            }),
                            (0, G.jsx)(`span`, { children: e }),
                          ],
                        },
                        e,
                      ),
                    ),
                  ],
                }),
              (0, G.jsxs)(`div`, {
                className: `towels-filter-group`,
                children: [
                  (0, G.jsx)(`div`, {
                    className: `towels-filter-title`,
                    children: `Price`,
                  }),
                  (0, G.jsxs)(`div`, {
                    style: {
                      fontSize: `11px`,
                      color: `#888`,
                      marginBottom: `10px`,
                    },
                    children: [
                      `Up to Rs. `,
                      y.maxPrice.toLocaleString(`en-IN`),
                    ],
                  }),
                  (0, G.jsx)(`input`, {
                    type: `range`,
                    min: `0`,
                    max: `6000`,
                    value: y.maxPrice,
                    onChange: (e) =>
                      b((t) => ({ ...t, maxPrice: Number(e.target.value) })),
                    style: { width: `100%`, accentColor: `#222` },
                  }),
                  (0, G.jsxs)(`div`, {
                    className: `towels-price-inputs`,
                    children: [
                      (0, G.jsxs)(`div`, {
                        className: `towels-price-field`,
                        children: [
                          (0, G.jsx)(`span`, {
                            style: {
                              fontSize: `11px`,
                              color: `#888`,
                              marginRight: `4px`,
                            },
                            children: `Rs.`,
                          }),
                          (0, G.jsx)(`input`, {
                            type: `number`,
                            min: `0`,
                            value: y.minPrice,
                            onChange: (e) =>
                              b((t) => ({
                                ...t,
                                minPrice: Number(e.target.value),
                              })),
                          }),
                        ],
                      }),
                      (0, G.jsx)(`span`, {
                        style: { color: `#ccc` },
                        children: `—`,
                      }),
                      (0, G.jsxs)(`div`, {
                        className: `towels-price-field`,
                        children: [
                          (0, G.jsx)(`span`, {
                            style: {
                              fontSize: `11px`,
                              color: `#888`,
                              marginRight: `4px`,
                            },
                            children: `Rs.`,
                          }),
                          (0, G.jsx)(`input`, {
                            type: `number`,
                            min: `0`,
                            max: `6000`,
                            value: y.maxPrice,
                            onChange: (e) =>
                              b((t) => ({
                                ...t,
                                maxPrice: Number(e.target.value),
                              })),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (y.productType.length > 0 ||
                y.size.length > 0 ||
                y.minPrice > 0 ||
                y.maxPrice < 6e3) &&
                (0, G.jsx)(`button`, {
                  className: `towels-clear-btn`,
                  onClick: () =>
                    b({
                      productType: [],
                      size: n ? [n] : [],
                      minPrice: 0,
                      maxPrice: 6e3,
                    }),
                  children: `Clear filters`,
                }),
              (0, G.jsxs)(`button`, {
                onClick: () => v(!1),
                style: {
                  marginTop: `20px`,
                  width: `100%`,
                  padding: `13px`,
                  background: `#1c1c1a`,
                  color: `#fff`,
                  border: `none`,
                  borderRadius: `6px`,
                  fontSize: `13px`,
                  fontWeight: `600`,
                  cursor: `pointer`,
                  fontFamily: `inherit`,
                },
                children: [
                  `Show `,
                  O.length,
                  ` result`,
                  O.length === 1 ? `` : `s`,
                ],
              }),
            ],
          }),
        ],
      }),
      (0, G.jsxs)(`div`, {
        className: `cat-page`,
        children: [
          (0, G.jsxs)(`nav`, {
            className: `cat-breadcrumb`,
            children: [
              (0, G.jsx)(x, { to: `/`, children: (0, G.jsx)(i, { size: 12 }) }),
              (0, G.jsx)(p, { size: 10 }),
              (0, G.jsx)(x, { to: `/products`, children: `Shop` }),
              C.breadcrumb?.map((e) =>
                (0, G.jsxs)(
                  B.Fragment,
                  {
                    children: [
                      (0, G.jsx)(p, { size: 10 }),
                      (0, G.jsx)(x, { to: e.path, children: e.label }),
                    ],
                  },
                  e.path,
                ),
              ),
              (0, G.jsx)(p, { size: 10 }),
              (0, G.jsx)(`span`, { children: C.label || `All Products` }),
            ],
          }),
          (0, G.jsx)(`h1`, {
            className: `cat-page-title`,
            children: r
              ? (0, G.jsxs)(G.Fragment, {
                  children: [
                    `Search results for "`,
                    (0, G.jsx)(`span`, {
                      style: { color: `#8b7355` },
                      children: r,
                    }),
                    `"`,
                  ],
                })
              : C.label || `All Products`,
          }),
          (0, G.jsxs)(`div`, {
            className: `towels-top-bar`,
            children: [
              (0, G.jsxs)(`div`, {
                style: {
                  display: `flex`,
                  alignItems: `center`,
                  gap: `14px`,
                  flexWrap: `wrap`,
                },
                children: [
                  (0, G.jsxs)(`button`, {
                    className: `mobile-filter-btn`,
                    onClick: () => v(!0),
                    children: [
                      (0, G.jsx)(F, { size: 13 }),
                      `Filters`,
                      y.productType.length +
                        y.size.length +
                        +(y.minPrice > 0 || y.maxPrice < 6e3) >
                        0 &&
                        (0, G.jsx)(`span`, {
                          style: {
                            background: `#fff`,
                            color: `#1c1c1a`,
                            borderRadius: `10px`,
                            padding: `0 5px`,
                            fontSize: `10px`,
                            fontWeight: 700,
                            marginLeft: `2px`,
                          },
                          children:
                            y.productType.length +
                            y.size.length +
                            +(y.minPrice > 0 || y.maxPrice < 6e3),
                        }),
                    ],
                  }),
                  (0, G.jsxs)(`div`, {
                    children: [
                      (0, G.jsx)(`span`, { children: `Sort: ` }),
                      (0, G.jsxs)(`select`, {
                        className: `towels-sort-select`,
                        value: h,
                        onChange: (e) => g(e.target.value),
                        children: [
                          (0, G.jsx)(`option`, {
                            value: `best-selling`,
                            children: `Best Selling`,
                          }),
                          (0, G.jsx)(`option`, {
                            value: `price-asc`,
                            children: `Price: Low to High`,
                          }),
                          (0, G.jsx)(`option`, {
                            value: `price-desc`,
                            children: `Price: High to Low`,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, G.jsxs)(`div`, {
                children: [O.length, ` product`, O.length === 1 ? `` : `s`],
              }),
            ],
          }),
          (0, G.jsxs)(`div`, {
            className: `towels-main-layout`,
            children: [
              (0, G.jsxs)(`aside`, {
                className: `towels-sidebar`,
                children: [
                  k.length > 0 &&
                    (0, G.jsxs)(`div`, {
                      className: `towels-filter-group`,
                      children: [
                        (0, G.jsx)(`div`, {
                          className: `towels-filter-title`,
                          children: `Product Type`,
                        }),
                        k.map((e) =>
                          (0, G.jsxs)(
                            `label`,
                            {
                              className: `towels-filter-option`,
                              children: [
                                (0, G.jsx)(`input`, {
                                  type: `checkbox`,
                                  checked: y.productType.includes(e),
                                  onChange: () => D(`productType`, e),
                                }),
                                (0, G.jsxs)(`span`, {
                                  children: [
                                    it[e],
                                    (0, G.jsx)(`sup`, {
                                      className: `towels-count-sup`,
                                      children: T[e] ?? 0,
                                    }),
                                  ],
                                }),
                              ],
                            },
                            e,
                          ),
                        ),
                      ],
                    }),
                  E.length > 0 &&
                    (0, G.jsxs)(`div`, {
                      className: `towels-filter-group`,
                      children: [
                        (0, G.jsx)(`div`, {
                          className: `towels-filter-title`,
                          children: `Size`,
                        }),
                        E.map((e) =>
                          (0, G.jsxs)(
                            `label`,
                            {
                              className: `towels-filter-option`,
                              children: [
                                (0, G.jsx)(`input`, {
                                  type: `checkbox`,
                                  checked: y.size.includes(e),
                                  onChange: () => D(`size`, e),
                                }),
                                (0, G.jsx)(`span`, { children: e }),
                              ],
                            },
                            e,
                          ),
                        ),
                      ],
                    }),
                  (0, G.jsxs)(`div`, {
                    className: `towels-filter-group`,
                    children: [
                      (0, G.jsx)(`div`, {
                        className: `towels-filter-title`,
                        children: `Price`,
                      }),
                      (0, G.jsxs)(`div`, {
                        style: {
                          fontSize: `11px`,
                          color: `#888`,
                          marginBottom: `10px`,
                        },
                        children: [
                          `Up to Rs. `,
                          y.maxPrice.toLocaleString(`en-IN`),
                        ],
                      }),
                      (0, G.jsx)(`input`, {
                        type: `range`,
                        min: `0`,
                        max: `6000`,
                        value: y.maxPrice,
                        onChange: (e) =>
                          b((t) => ({
                            ...t,
                            maxPrice: Number(e.target.value),
                          })),
                        style: { width: `100%`, accentColor: `#222` },
                      }),
                      (0, G.jsxs)(`div`, {
                        className: `towels-price-inputs`,
                        children: [
                          (0, G.jsxs)(`div`, {
                            className: `towels-price-field`,
                            children: [
                              (0, G.jsx)(`span`, {
                                style: {
                                  fontSize: `11px`,
                                  color: `#888`,
                                  marginRight: `4px`,
                                },
                                children: `Rs.`,
                              }),
                              (0, G.jsx)(`input`, {
                                type: `number`,
                                min: `0`,
                                value: y.minPrice,
                                onChange: (e) =>
                                  b((t) => ({
                                    ...t,
                                    minPrice: Number(e.target.value),
                                  })),
                              }),
                            ],
                          }),
                          (0, G.jsx)(`span`, {
                            style: { color: `#ccc` },
                            children: `—`,
                          }),
                          (0, G.jsxs)(`div`, {
                            className: `towels-price-field`,
                            children: [
                              (0, G.jsx)(`span`, {
                                style: {
                                  fontSize: `11px`,
                                  color: `#888`,
                                  marginRight: `4px`,
                                },
                                children: `Rs.`,
                              }),
                              (0, G.jsx)(`input`, {
                                type: `number`,
                                min: `0`,
                                max: `6000`,
                                value: y.maxPrice,
                                onChange: (e) =>
                                  b((t) => ({
                                    ...t,
                                    maxPrice: Number(e.target.value),
                                  })),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (y.productType.length > 0 ||
                    y.size.length > 0 ||
                    y.minPrice > 0 ||
                    y.maxPrice < 6e3) &&
                    (0, G.jsx)(`button`, {
                      className: `towels-clear-btn`,
                      onClick: () =>
                        b({
                          productType: [],
                          size: n ? [n] : [],
                          minPrice: 0,
                          maxPrice: 6e3,
                        }),
                      children: `Clear filters`,
                    }),
                ],
              }),
              (0, G.jsx)(`div`, {
                className: `towels-grid`,
                children: l
                  ? (0, G.jsx)(`div`, {
                      className: `towels-center-state`,
                      children: `Loading products...`,
                    })
                  : f
                    ? (0, G.jsxs)(`div`, {
                        className: `towels-center-state`,
                        style: { color: `#a61d24` },
                        children: [`Error: `, f],
                      })
                    : O.length === 0
                      ? (0, G.jsxs)(`div`, {
                          className: `towels-empty-state`,
                          children: [
                            (0, G.jsx)(`div`, {
                              style: { fontSize: `32px`, marginBottom: `12px` },
                              children: `—`,
                            }),
                            `No products found for your current filters.`,
                            (0, G.jsx)(`br`, {}),
                            (0, G.jsx)(`button`, {
                              style: {
                                marginTop: `16px`,
                                background: `none`,
                                border: `1px solid #222`,
                                padding: `8px 20px`,
                                fontSize: `11px`,
                                textTransform: `uppercase`,
                                letterSpacing: `0.08em`,
                                cursor: `pointer`,
                              },
                              onClick: () =>
                                b({
                                  productType: [],
                                  size: [],
                                  minPrice: 0,
                                  maxPrice: 6e3,
                                }),
                              children: `Clear Filters`,
                            }),
                          ],
                        })
                      : O.map((e) =>
                          (0, G.jsx)(
                            at,
                            {
                              product: e,
                              isLiked: s.includes(e._id),
                              onToggleWishlist: S,
                            },
                            e._id,
                          ),
                        ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var st = [`Paid`, `Processing`, `Shipped`, `Delivered`, `Cancelled`],
  ct = [
    { value: "mul-cotton-saree", label: "Mul Cotton Saree" },
    { value: "gini-tissue-saree", label: "Gini Tissue Saree" },
    { value: "plain-soft-silk-saree", label: "Plain Soft Silk Saree" },
    {
      value: "border-less-soft-silk-saree",
      label: "Borderless Soft Silk Saree",
    },
    { value: "champion-silk-saree", label: "Champion Silk Saree" },
    { value: "soft-silk-saree", label: "Soft Silk Saree" },
    { value: "ds-kottanchi-saree", label: "DS Kottanchi Saree" },
    { value: "kalyani-cotton-saree", label: "Kalyani Cotton Saree" },
    { value: "khadi-embroidery-saree", label: "Khadi Embroidery" },
  ],
  lt = {
    Paid: { bg: `#e3f2fd`, color: `#1565c0` },
    Processing: { bg: `#fff3e0`, color: `#e65100` },
    Shipped: { bg: `#f3e5f5`, color: `#6a1b9a` },
    Delivered: { bg: `#e8f5e9`, color: `#2e7d32` },
    Cancelled: { bg: `#ffebee`, color: `#c62828` },
  },
  ut = {
    name: ``,
    category: `kalyani-cotton-saree`,
    subcategory: ``,
    size: ``,
    price: ``,
    discountPrice: ``,
    image: ``,
    images: [``, ``, ``, ``, ``, ``],
    variants: [``, ``, ``, ``, ``, ``],
    stock: ``,
    overview: ``,
    sizeFit: ``,
    material: ``,
    careGuide: ``,
    shippingRefund: ``,
  };
function dt() {
  let e = d(),
    [t, n] = (0, B.useState)(null),
    [r, i] = (0, B.useState)([]),
    [a, o] = (0, B.useState)([]),
    [s, c] = (0, B.useState)([]),
    [l, u] = (0, B.useState)(!0),
    [f, p] = (0, B.useState)(`Users`),
    [m, h] = (0, B.useState)(null),
    [g, _] = (0, B.useState)(null),
    [v, y] = (0, B.useState)(null),
    [b, x] = (0, B.useState)(null),
    [S, C] = (0, B.useState)(!1),
    [w, T] = (0, B.useState)(null),
    [E, D] = (0, B.useState)(ut),
    [O, k] = (0, B.useState)(!1),
    [A, j] = (0, B.useState)(``),
    [M, N] = (0, B.useState)([!1, !1, !1, !1, !1, !1]),
    [ee, P] = (0, B.useState)(null),
    F = localStorage.getItem(`token`),
    I = (() => {
      try {
        return JSON.parse(localStorage.getItem(`user`) || `{}`).id;
      } catch {
        return null;
      }
    })(),
    L = { "Content-Type": `application/json`, Authorization: `Bearer ${F}` };
  (0, B.useEffect)(() => {
    let t = (() => {
      try {
        return JSON.parse(localStorage.getItem(`user`) || `null`);
      } catch {
        return null;
      }
    })();
    if (!t || t.role !== `admin`) {
      e(`/`);
      return;
    }
    te();
  }, []);
  let te = async () => {
      u(!0);
      try {
        let [e, t, r, a] = await Promise.all([
            fetch(`${H}/admin/stats?v=nocache`, { headers: L }),
            fetch(`${H}/admin/users?v=nocache`, { headers: L }),
            fetch(`${H}/admin/orders?v=nocache`, { headers: L }),
            fetch(`${H}/admin/products?v=nocache`, { headers: L }),
          ]),
          [s, l, u, d] = await Promise.all([
            e.json(),
            t.json(),
            r.json(),
            a.json(),
          ]);
        (s.success && n(s.stats),
          l.success && i(l.users),
          u.success && o(u.orders),
          d.success && c(d.products));
      } catch (e) {
        console.error(e);
      } finally {
        u(!1);
      }
    },
    ne = async (e, t) => {
      h(e);
      try {
        let n = await (
          await fetch(`${H}/admin/users/${e}/role`, {
            method: `PATCH`,
            headers: L,
            body: JSON.stringify({ role: t }),
          })
        ).json();
        n.success
          ? i((n) => n.map((n) => (n._id === e ? { ...n, role: t } : n)))
          : alert(n.error || `Failed`);
      } catch {
        alert(`Network error.`);
      } finally {
        h(null);
      }
    },
    re = async (e, t) => {
      _(e);
      try {
        let n = await (
          await fetch(`${H}/admin/orders/${e}/status`, {
            method: `PATCH`,
            headers: L,
            body: JSON.stringify({ status: t }),
          })
        ).json();
        n.success
          ? o((n) => n.map((n) => (n._id === e ? { ...n, status: t } : n)))
          : alert(n.error || `Failed`);
      } catch {
        alert(`Network error.`);
      } finally {
        _(null);
      }
    },
    ie = () => {
      (T(null), D(ut), j(``), C(!0));
    },
    ae = (e) => {
      T(e);
      let t =
        Array.isArray(e.images) && e.images.length > 0
          ? [...e.images, ``, ``, ``, ``, ``, ``].slice(0, 6)
          : [e.image || ``, ``, ``, ``, ``, ``];
      let v =
        Array.isArray(e.variants) && e.variants.length > 0
          ? [...e.variants, ``, ``, ``, ``, ``, ``].slice(0, 6)
          : [``, ``, ``, ``, ``, ``];
      (D({
        name: e.name,
        category: e.category,
        subcategory: e.subcategory,
        size: e.size,
        price: e.price,
        discountPrice: e.discountPrice,
        image: e.image || ``,
        images: t,
        variants: v,
        stock: e.stock,
        overview: e.overview || ``,
        sizeFit: e.sizeFit || ``,
        material: e.material || ``,
        careGuide: e.careGuide || ``,
        shippingRefund: e.shippingRefund || ``,
      }),
        j(``),
        C(!0));
    },
    R = () => {
      (C(!1), T(null), D(ut), j(``));
    },
    z = (e) => {
      const { name, value } = e.target;
      D((prev) => {
        const next = { ...prev, [name]: value };
        const mrp = Number(next.price || 0);
        const sale = Number(next.discountPrice || 0);
        if (mrp > 0 && sale > 0 && mrp > sale) {
          next.discountPercent = Math.round(((mrp - sale) / mrp) * 100);
        } else {
          next.discountPercent = 0;
        }
        return next;
      });
    },
    oe = (e, t) => {
      D((n) => {
        let r = [...n.images];
        return ((r[e] = t), { ...n, images: r });
      });
    },
    se = async (e, t, isRetry = false) => {
      if (!t || !t.type.startsWith(`image/`)) return;
      const freshToken = localStorage.getItem(`token`);
      if (!freshToken) {
        alert(`You must be logged in as admin to upload images.`);
        return;
      }
      if (!isRetry) {
        N((arr) => {
          let n = [...arr];
          n[e] = !0;
          return n;
        });
      }
      try {
        let fileToUpload = t;
        if (t.size > 1024 * 1024) {
          try {
            fileToUpload = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  let width = img.width;
                  let height = img.height;
                  const MAX_WIDTH = 1600;
                  const MAX_HEIGHT = 1600;
                  if (width > height) {
                    if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                    }
                  } else {
                    if (height > MAX_HEIGHT) {
                      width *= MAX_HEIGHT / height;
                      height = MAX_HEIGHT;
                    }
                  }
                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0, width, height);
                  canvas.toBlob((blob) => {
                    if (!blob) {
                      resolve(t);
                      return;
                    }
                    const name = t.name ? t.name.replace(/\.[^/.]+$/, "") + ".jpg" : "upload.jpg";
                    const compressedFile = new File([blob], name, {
                      type: "image/jpeg",
                      lastModified: Date.now()
                    });
                    resolve(compressedFile);
                  }, 'image/jpeg', 0.85);
                };
                img.onerror = () => resolve(t);
                img.src = event.target.result;
              };
              reader.onerror = () => resolve(t);
              reader.readAsDataURL(t);
            });
          } catch (compErr) {
            console.warn("Client-side compression failed, uploading original file", compErr);
          }
        }
        let n = new FormData();
        n.append(`image`, fileToUpload);
        let r = await fetch(`${H}/upload`, {
            method: `POST`,
            headers: { Authorization: `Bearer ${freshToken}` },
            body: n,
          }),
          i = await r.json();
        if (!r.ok) throw Error(i.error || i.message || `Upload failed`);
        oe(e, `${i.url}?v=${Date.now()}`);
      } catch (err) {
        if (!isRetry) {
          console.warn(`Upload slot ${e} failed, retrying once...`, err.message);
          await new Promise((resolve) => setTimeout(resolve, 1200));
          return se(e, t, true);
        }
        console.error(`Upload error on slot ${e}:`, err.message);
        if (!window._uploadErrShown) {
          window._uploadErrShown = !0;
          setTimeout(() => { window._uploadErrShown = !1; }, 4000);
          alert(`Upload failed: ${err.message}`);
        }
      } finally {
        N((arr) => {
          let n = [...arr];
          n[e] = !1;
          return n;
        });
      }
    },
    ce = (e, t) => {
      (e.preventDefault(), P(null));
      let n = e.dataTransfer.files[0];
      n && se(t, n);
    },
    le = async (e) => {
      (e.preventDefault(), k(!0), j(``));
      let t = E.images.map(img => img ? img.split('?')[0] : '').filter(Boolean),
        v = (E.variants || []).filter((_, idx) => E.images[idx] && E.images[idx].trim() !== "");
      const mrp = Number(E.price || 0);
      const sale = Number(E.discountPrice || 0);
      let r = {
        ...E,
        price: mrp,
        discountPrice: sale,
        discountPercent: mrp > 0 && sale > 0 && mrp > sale ? Math.round(((mrp - sale) / mrp) * 100) : 0,
        stock: Number(E.stock),
        images: t,
        image: t[0] || ``,
        variants: v
      };
      try {
        let e = w ? `${H}/admin/products/${w._id}` : `${H}/admin/products`,
          t = await (
            await fetch(e, {
              method: w ? `PUT` : `POST`,
              headers: L,
              body: JSON.stringify(r),
            })
          ).json();
        t.success
          ? (w
              ? c((e) => e.map((e) => (e._id === w._id ? t.product : e)))
              : (c((e) => [t.product, ...e]),
                n((e) => e && { ...e, totalProducts: e.totalProducts + 1 })),
            window.dispatchEvent(new Event("productsUpdated")),
            R())
          : j(t.error || `Failed to save product`);
      } catch {
        j(`Network error. Please try again.`);
      } finally {
        k(!1);
      }
    },
    ue = async (e) => {
      if (
        window.confirm(`Delete this product? This action cannot be undone.`)
      ) {
        x(e);
        try {
          let t = await (
            await fetch(`${H}/admin/products/${e}`, {
              method: `DELETE`,
              headers: L,
            })
          ).json();
          t.success
            ? (c((t) => t.filter((t) => t._id !== e)),
              n((e) => e && { ...e, totalProducts: e.totalProducts - 1 }),
              window.dispatchEvent(new Event("productsUpdated")))
            : alert(t.error || `Failed`);
        } catch {
          alert(`Network error.`);
        } finally {
          x(null);
        }
      }
    },
    V = {
      page: {
        minHeight: `70vh`,
        backgroundColor: `#fafaf7`,
        padding: `48px 24px`,
        fontFamily: `'DM Sans', sans-serif`,
      },
      container: { maxWidth: `1140px`, margin: `0 auto` },
      h1: {
        fontSize: `22px`,
        fontWeight: `700`,
        color: `#1c1c1a`,
        marginBottom: `4px`,
        letterSpacing: `-0.02em`,
      },
      sub: { fontSize: `13px`, color: `#999`, marginBottom: `36px` },
      statsGrid: {
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        gap: `16px`,
        marginBottom: `40px`,
      },
      card: {
        backgroundColor: `#fff`,
        border: `1px solid #ebebeb`,
        borderRadius: `10px`,
        padding: `24px 28px`,
      },
      cardLabel: {
        fontSize: `11px`,
        textTransform: `uppercase`,
        letterSpacing: `0.08em`,
        color: `#aaa`,
        marginBottom: `8px`,
      },
      cardValue: {
        fontSize: `34px`,
        fontWeight: `700`,
        color: `#1c1c1a`,
        lineHeight: 1,
      },
      cardBar: {
        width: `28px`,
        height: `3px`,
        backgroundColor: `#8b7355`,
        borderRadius: `2px`,
        marginTop: `14px`,
      },
      tabRow: {
        display: `flex`,
        borderBottom: `1px solid #ebebeb`,
        marginBottom: `0`,
      },
      tabBtn: (e) => ({
        padding: `11px 20px`,
        fontSize: `11px`,
        textTransform: `uppercase`,
        letterSpacing: `0.07em`,
        border: `none`,
        background: `none`,
        cursor: `pointer`,
        fontFamily: `'DM Sans', sans-serif`,
        fontWeight: e ? `700` : `400`,
        color: e ? `#1c1c1a` : `#aaa`,
        borderBottom: e ? `2px solid #8b7355` : `2px solid transparent`,
        marginBottom: `-1px`,
        transition: `color 0.15s`,
      }),
      tableWrap: {
        backgroundColor: `#fff`,
        border: `1px solid #ebebeb`,
        borderTop: `none`,
        borderRadius: `0 0 10px 10px`,
        overflowX: `auto`,
        WebkitOverflowScrolling: `touch`,
      },
      table: { width: `100%`, borderCollapse: `collapse` },
      th: {
        padding: `12px 16px`,
        textAlign: `left`,
        fontSize: `10px`,
        textTransform: `uppercase`,
        letterSpacing: `0.08em`,
        color: `#aaa`,
        backgroundColor: `#fafaf7`,
        borderBottom: `1px solid #ebebeb`,
        fontWeight: `600`,
        whiteSpace: `nowrap`,
      },
      td: {
        padding: `13px 16px`,
        fontSize: `13px`,
        color: `#333`,
        borderBottom: `1px solid #f5f5f5`,
        verticalAlign: `middle`,
      },
      roleBadge: (e) => ({
        display: `inline-block`,
        padding: `3px 10px`,
        borderRadius: `20px`,
        fontSize: `10px`,
        fontWeight: `700`,
        textTransform: `uppercase`,
        letterSpacing: `0.06em`,
        backgroundColor: e === `admin` ? `#702c3a` : `#f0ece6`,
        color: e === `admin` ? `#fff` : `#8b7355`,
      }),
      outlineBtn: (e) => ({
        padding: `5px 12px`,
        fontSize: `11px`,
        fontWeight: `600`,
        textTransform: `uppercase`,
        letterSpacing: `0.04em`,
        border: `1px solid ${e}`,
        borderRadius: `4px`,
        cursor: `pointer`,
        fontFamily: `'DM Sans', sans-serif`,
        backgroundColor: `transparent`,
        color: e,
        whiteSpace: `nowrap`,
      }),
      empty: {
        textAlign: `center`,
        padding: `56px`,
        color: `#ccc`,
        fontSize: `13px`,
      },
      addBtn: {
        padding: `9px 18px`,
        backgroundColor: `#1c1c1a`,
        color: `#fff`,
        border: `none`,
        borderRadius: `6px`,
        fontSize: `12px`,
        fontWeight: `600`,
        textTransform: `uppercase`,
        letterSpacing: `0.05em`,
        cursor: `pointer`,
        fontFamily: `'DM Sans', sans-serif`,
      },
      formTitle: {
        fontSize: `14px`,
        fontWeight: `700`,
        color: `#1c1c1a`,
        marginBottom: `20px`,
      },
      label: {
        fontSize: `11px`,
        textTransform: `uppercase`,
        letterSpacing: `0.07em`,
        color: `#888`,
        marginBottom: `5px`,
        display: `block`,
        fontWeight: `600`,
      },
      input: {
        width: `100%`,
        padding: `9px 12px`,
        border: `1px solid #ddddd8`,
        borderRadius: `6px`,
        fontSize: `13px`,
        fontFamily: `'DM Sans', sans-serif`,
        color: `#1c1c1a`,
        outline: `none`,
        boxSizing: `border-box`,
        backgroundColor: `#fff`,
      },
      primaryBtn: (e) => ({
        padding: `10px 22px`,
        backgroundColor: e ? `#aaa` : `#1c1c1a`,
        color: `#fff`,
        border: `none`,
        borderRadius: `6px`,
        fontSize: `12px`,
        fontWeight: `600`,
        textTransform: `uppercase`,
        letterSpacing: `0.05em`,
        cursor: e ? `not-allowed` : `pointer`,
        fontFamily: `'DM Sans', sans-serif`,
      }),
      cancelBtn: {
        padding: `10px 18px`,
        backgroundColor: `transparent`,
        color: `#888`,
        border: `1px solid #ddddd8`,
        borderRadius: `6px`,
        fontSize: `12px`,
        fontWeight: `600`,
        textTransform: `uppercase`,
        letterSpacing: `0.05em`,
        cursor: `pointer`,
        fontFamily: `'DM Sans', sans-serif`,
      },
      formError: { fontSize: `12px`, color: `#c62828`, marginTop: `10px` },
      thumbImg: {
        width: `38px`,
        height: `38px`,
        objectFit: `cover`,
        borderRadius: `6px`,
        backgroundColor: `#f5f5f5`,
        border: `1px solid #ebebeb`,
      },
      expandedBg: {
        backgroundColor: `#fafaf7`,
        borderBottom: `1px solid #f0f0f0`,
      },
      itemsWrap: {
        padding: `14px 16px`,
        display: `flex`,
        flexWrap: `wrap`,
        gap: `10px`,
      },
      itemCard: {
        display: `flex`,
        gap: `10px`,
        alignItems: `center`,
        backgroundColor: `#fff`,
        border: `1px solid #ebebeb`,
        borderRadius: `8px`,
        padding: `10px 14px`,
      },
      itemImg: {
        width: `36px`,
        height: `36px`,
        objectFit: `cover`,
        borderRadius: `4px`,
        backgroundColor: `#f5f5f5`,
      },
      itemName: {
        fontSize: `12px`,
        fontWeight: `600`,
        color: `#333`,
        maxWidth: `160px`,
      },
      itemMeta: { fontSize: `11px`, color: `#aaa`, marginTop: `2px` },
    };
  return l
    ? (0, G.jsx)(`div`, {
        style: {
          ...V.page,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
        },
        children: (0, G.jsx)(`span`, {
          style: {
            color: `#bbb`,
            fontSize: `13px`,
            fontFamily: `'DM Sans', sans-serif`,
          },
          children: `Loading...`,
        }),
      })
    : (0, G.jsxs)(`div`, {
        style: V.page,
        children: [
          (0, G.jsx)(`style`, {
            children: `
        /* ── Responsive form grid ──────────────────────────── */
        .adm-section-bar { display: flex; justify-content: space-between; align-items: center; padding: 16px 0 12px; }
        .adm-form-panel  { background: #fff; border: 1px solid #ebebeb; border-radius: 10px; padding: 28px 28px 24px; margin-bottom: 16px; }
        .adm-form-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 20px; }
        .adm-form-full   { grid-column: 1 / -1; }
        .adm-form-actions { display: flex; gap: 10px; margin-top: 20px; }

        /* ── Image upload grid ─────────────────────────────── */
        .adm-img-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .adm-img-slot { position: relative; }
        .adm-drop-zone {
          width: 100%; aspect-ratio: 1/1; border-radius: 8px;
          border: 2px dashed #ddddd8; background: #fafaf7;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; cursor: pointer; transition: border-color 0.2s, background 0.2s;
          overflow: hidden; box-sizing: border-box;
        }
        .adm-drop-zone:hover, .adm-drop-zone.drag-over {
          border-color: #8b7355; background: #fdf8f2;
        }
        .adm-drop-zone.has-image { border-style: solid; border-color: #ebebeb; padding: 0; }
        .adm-drop-zone.uploading { border-color: #c9a96e; background: #fdf8f2; }
        .adm-drop-zone input[type="file"] { display: none; }
        .adm-drop-icon { font-size: 24px; color: #ccc; line-height: 1; }
        .adm-drop-label { font-size: 10px; color: #aaa; text-align: center; line-height: 1.4; }
        .adm-drop-label strong { color: #8b7355; }
        .adm-img-preview { width: 100%; height: 100%; object-fit: cover; display: block; }
        .adm-slot-badge {
          position: absolute; top: 5px; left: 5px; background: #1c1c1a; color: #fff;
          font-size: 9px; font-weight: 700; border-radius: 4px; padding: 2px 6px;
          letter-spacing: 0.04em; pointer-events: none;
        }
        .adm-slot-remove {
          position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.55);
          border: none; color: #fff; border-radius: 50%; width: 22px; height: 22px;
          font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center;
          line-height: 1;
        }
        .adm-slot-remove:hover { background: #c62828; }
        .adm-upload-spinner {
          width: 28px; height: 28px; border: 3px solid #e8e0d6;
          border-top-color: #8b7355; border-radius: 50%;
          animation: admSpin 0.7s linear infinite;
        }
        @keyframes admSpin { to { transform: rotate(360deg); } }

        @media (max-width: 600px) {
          .adm-section-bar  { flex-wrap: wrap; gap: 8px; }
          .adm-form-panel   { padding: 20px 16px 18px; }
          .adm-form-grid    { grid-template-columns: 1fr; }
          .adm-form-full    { grid-column: 1; }
          .adm-form-actions { flex-direction: column; }
          .adm-form-actions button { width: 100%; box-sizing: border-box; }
          .adm-img-grid     { grid-template-columns: repeat(2, 1fr) !important; }
          .adm-drop-label   { font-size: 9px; }
          .adm-drop-icon    { font-size: 18px; }
        }
        @media (max-width: 420px) {
          .adm-img-grid     { grid-template-columns: 1fr !important; }
          .adm-drop-zone    { min-height: 100px; }
        }
      `,
          }),
          (0, G.jsxs)(`div`, {
            style: V.container,
            children: [
              (0, G.jsx)(`h1`, { style: V.h1, children: `Admin Dashboard` }),
              (0, G.jsx)(`p`, {
                style: V.sub,
                children: `Manage users, track orders, and control your product catalogue.`,
              }),
              t &&
                (0, G.jsx)(`div`, {
                  style: V.statsGrid,
                  children: [
                    { label: `Total Users`, value: t.totalUsers },
                    { label: `Total Products`, value: t.totalProducts },
                    { label: `Total Orders`, value: t.totalOrders },
                  ].map(({ label: e, value: t }) =>
                    (0, G.jsxs)(
                      `div`,
                      {
                        style: V.card,
                        children: [
                          (0, G.jsx)(`div`, {
                            style: V.cardLabel,
                            children: e,
                          }),
                          (0, G.jsx)(`div`, {
                            style: V.cardValue,
                            children: t,
                          }),
                          (0, G.jsx)(`div`, { style: V.cardBar }),
                        ],
                      },
                      e,
                    ),
                  ),
                }),
              (0, G.jsx)(`div`, {
                style: V.tabRow,
                children: [`Users`, `Orders`, `Products`].map((e) =>
                  (0, G.jsx)(
                    `button`,
                    {
                      style: V.tabBtn(f === e),
                      onClick: () => {
                        (p(e), C(!1));
                      },
                      children: e,
                    },
                    e,
                  ),
                ),
              }),
              f === `Users` &&
                (() => {
                  let e = {};
                  a.forEach((t) => {
                    (t.guestInfo?.phone &&
                      !e[t.guestInfo.phone] &&
                      (e[t.guestInfo.phone] = {
                        name: t.guestInfo.name || `Guest`,
                        phone: t.guestInfo.phone,
                        orderCount: 0,
                        lastOrder: t.createdAt,
                      }),
                      t.guestInfo?.phone &&
                        (e[t.guestInfo.phone].orderCount++,
                        new Date(t.createdAt) >
                          new Date(e[t.guestInfo.phone].lastOrder) &&
                          (e[t.guestInfo.phone].lastOrder = t.createdAt)));
                  });
                  let t = Object.values(e);
                  return (0, G.jsxs)(`div`, {
                    children: [
                      (0, G.jsxs)(`div`, {
                        style: V.tableWrap,
                        children: [
                          (0, G.jsxs)(`div`, {
                            style: {
                              padding: `12px 16px 8px`,
                              fontSize: `11px`,
                              fontWeight: `700`,
                              textTransform: `uppercase`,
                              letterSpacing: `0.08em`,
                              color: `#8b7355`,
                              borderBottom: `1px solid #f0f0f0`,
                            },
                            children: [`Registered Users (`, r.length, `)`],
                          }),
                          r.length === 0
                            ? (0, G.jsx)(`div`, {
                                style: V.empty,
                                children: `No users found.`,
                              })
                            : (0, G.jsxs)(`table`, {
                                style: { ...V.table, minWidth: `560px` },
                                children: [
                                  (0, G.jsx)(`thead`, {
                                    children: (0, G.jsxs)(`tr`, {
                                      children: [
                                        (0, G.jsx)(`th`, {
                                          style: V.th,
                                          children: `Name`,
                                        }),
                                        (0, G.jsx)(`th`, {
                                          style: V.th,
                                          children: `Email`,
                                        }),
                                        (0, G.jsx)(`th`, {
                                          style: V.th,
                                          children: `Role`,
                                        }),
                                        (0, G.jsx)(`th`, {
                                          style: V.th,
                                          children: `Joined`,
                                        }),
                                        (0, G.jsx)(`th`, {
                                          style: V.th,
                                          children: `Action`,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, G.jsx)(`tbody`, {
                                    children: r.map((e) =>
                                      (0, G.jsxs)(
                                        `tr`,
                                        {
                                          children: [
                                            (0, G.jsx)(`td`, {
                                              style: V.td,
                                              children: e.name,
                                            }),
                                            (0, G.jsx)(`td`, {
                                              style: { ...V.td, color: `#888` },
                                              children: e.email,
                                            }),
                                            (0, G.jsx)(`td`, {
                                              style: V.td,
                                              children: (0, G.jsx)(`span`, {
                                                style: V.roleBadge(e.role),
                                                children: e.role,
                                              }),
                                            }),
                                            (0, G.jsx)(`td`, {
                                              style: {
                                                ...V.td,
                                                color: `#aaa`,
                                                fontSize: `12px`,
                                              },
                                              children: new Date(
                                                e.createdAt,
                                              ).toLocaleDateString(`en-IN`, {
                                                day: `numeric`,
                                                month: `short`,
                                                year: `numeric`,
                                              }),
                                            }),
                                            (0, G.jsx)(`td`, {
                                              style: V.td,
                                              children:
                                                e._id === I
                                                  ? (0, G.jsx)(`span`, {
                                                      style: {
                                                        fontSize: `11px`,
                                                        color: `#ccc`,
                                                      },
                                                      children: `You`,
                                                    })
                                                  : (0, G.jsx)(`button`, {
                                                      style: V.outlineBtn(
                                                        e.role === `admin`
                                                          ? `#702c3a`
                                                          : `#8b7355`,
                                                      ),
                                                      disabled: m === e._id,
                                                      onClick: () =>
                                                        ne(
                                                          e._id,
                                                          e.role === `admin`
                                                            ? `user`
                                                            : `admin`,
                                                        ),
                                                      children:
                                                        m === e._id
                                                          ? `...`
                                                          : e.role === `admin`
                                                            ? `Revoke Admin`
                                                            : `Make Admin`,
                                                    }),
                                            }),
                                          ],
                                        },
                                        e._id,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                        ],
                      }),
                      (0, G.jsxs)(`div`, {
                        style: { ...V.tableWrap, marginTop: `20px` },
                        children: [
                          (0, G.jsxs)(`div`, {
                            style: {
                              padding: `12px 16px 8px`,
                              fontSize: `11px`,
                              fontWeight: `700`,
                              textTransform: `uppercase`,
                              letterSpacing: `0.08em`,
                              color: `#92400e`,
                              borderBottom: `1px solid #f0f0f0`,
                            },
                            children: [`Guest Buyers (`, t.length, `)`],
                          }),
                          t.length === 0
                            ? (0, G.jsx)(`div`, {
                                style: V.empty,
                                children: `No guest orders yet.`,
                              })
                            : (0, G.jsxs)(`table`, {
                                style: { ...V.table, minWidth: `440px` },
                                children: [
                                  (0, G.jsx)(`thead`, {
                                    children: (0, G.jsxs)(`tr`, {
                                      children: [
                                        (0, G.jsx)(`th`, {
                                          style: V.th,
                                          children: `Name`,
                                        }),
                                        (0, G.jsx)(`th`, {
                                          style: V.th,
                                          children: `Mobile`,
                                        }),
                                        (0, G.jsx)(`th`, {
                                          style: V.th,
                                          children: `Orders`,
                                        }),
                                        (0, G.jsx)(`th`, {
                                          style: V.th,
                                          children: `Last Order`,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, G.jsx)(`tbody`, {
                                    children: t.map((e) =>
                                      (0, G.jsxs)(
                                        `tr`,
                                        {
                                          children: [
                                            (0, G.jsx)(`td`, {
                                              style: V.td,
                                              children: (0, G.jsxs)(`div`, {
                                                style: {
                                                  display: `flex`,
                                                  alignItems: `center`,
                                                  gap: `7px`,
                                                },
                                                children: [
                                                  e.name,
                                                  (0, G.jsx)(`span`, {
                                                    style: {
                                                      padding: `1px 7px`,
                                                      borderRadius: `10px`,
                                                      fontSize: `9px`,
                                                      fontWeight: `700`,
                                                      textTransform: `uppercase`,
                                                      background: `#fef3c7`,
                                                      color: `#92400e`,
                                                      letterSpacing: `0.04em`,
                                                    },
                                                    children: `Guest`,
                                                  }),
                                                ],
                                              }),
                                            }),
                                            (0, G.jsxs)(`td`, {
                                              style: { ...V.td, color: `#888` },
                                              children: [`📞 `, e.phone],
                                            }),
                                            (0, G.jsx)(`td`, {
                                              style: {
                                                ...V.td,
                                                textAlign: `center`,
                                              },
                                              children: e.orderCount,
                                            }),
                                            (0, G.jsx)(`td`, {
                                              style: {
                                                ...V.td,
                                                color: `#aaa`,
                                                fontSize: `12px`,
                                              },
                                              children: new Date(
                                                e.lastOrder,
                                              ).toLocaleDateString(`en-IN`, {
                                                day: `numeric`,
                                                month: `short`,
                                                year: `numeric`,
                                              }),
                                            }),
                                          ],
                                        },
                                        e.phone,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                        ],
                      }),
                    ],
                  });
                })(),
              f === `Orders` &&
                (0, G.jsx)(`div`, {
                  style: V.tableWrap,
                  children:
                    a.length === 0
                      ? (0, G.jsx)(`div`, {
                          style: V.empty,
                          children: `No orders yet.`,
                        })
                      : (0, G.jsxs)(`table`, {
                          style: { ...V.table, minWidth: `680px` },
                          children: [
                            (0, G.jsx)(`thead`, {
                              children: (0, G.jsxs)(`tr`, {
                                children: [
                                  (0, G.jsx)(`th`, {
                                    style: V.th,
                                    children: `Order ID`,
                                  }),
                                  (0, G.jsx)(`th`, {
                                    style: V.th,
                                    children: `Customer`,
                                  }),
                                  (0, G.jsx)(`th`, {
                                    style: V.th,
                                    children: `Items`,
                                  }),
                                  (0, G.jsx)(`th`, {
                                    style: V.th,
                                    children: `Amount`,
                                  }),
                                  (0, G.jsx)(`th`, {
                                    style: V.th,
                                    children: `Status`,
                                  }),
                                  (0, G.jsx)(`th`, {
                                    style: V.th,
                                    children: `Date`,
                                  }),
                                ],
                              }),
                            }),
                            (0, G.jsx)(`tbody`, {
                              children: a.map((e) =>
                                (0, G.jsxs)(
                                  B.Fragment,
                                  {
                                    children: [
                                      (0, G.jsxs)(`tr`, {
                                        children: [
                                          (0, G.jsx)(`td`, {
                                            style: {
                                              ...V.td,
                                              fontFamily: `monospace`,
                                              fontSize: `11px`,
                                              color: `#bbb`,
                                            },
                                            children: (
                                              e.razorpayOrderId || e._id
                                            ).slice(-10),
                                          }),
                                          (0, G.jsx)(`td`, {
                                            style: V.td,
                                            children: e.userId
                                              ? (0, G.jsxs)(G.Fragment, {
                                                  children: [
                                                    (0, G.jsx)(`div`, {
                                                      style: {
                                                        fontWeight: `500`,
                                                      },
                                                      children: e.userId.name,
                                                    }),
                                                    (0, G.jsx)(`div`, {
                                                      style: {
                                                        fontSize: `11px`,
                                                        color: `#bbb`,
                                                        marginTop: `2px`,
                                                      },
                                                      children: e.userId.email,
                                                    }),
                                                  ],
                                                })
                                              : e.guestInfo?.phone
                                                ? (0, G.jsxs)(G.Fragment, {
                                                    children: [
                                                      (0, G.jsx)(`div`, {
                                                        style: {
                                                          fontWeight: `500`,
                                                        },
                                                        children:
                                                          e.guestInfo.name ||
                                                          `Guest`,
                                                      }),
                                                      (0, G.jsxs)(`div`, {
                                                        style: {
                                                          fontSize: `11px`,
                                                          color: `#bbb`,
                                                          marginTop: `2px`,
                                                        },
                                                        children: [
                                                          `📞 `,
                                                          e.guestInfo.phone,
                                                        ],
                                                      }),
                                                      (0, G.jsx)(`span`, {
                                                        style: {
                                                          display: `inline-block`,
                                                          marginTop: `2px`,
                                                          padding: `1px 7px`,
                                                          borderRadius: `10px`,
                                                          fontSize: `9px`,
                                                          fontWeight: `700`,
                                                          textTransform: `uppercase`,
                                                          background: `#fef3c7`,
                                                          color: `#92400e`,
                                                          letterSpacing: `0.04em`,
                                                        },
                                                        children: `Guest`,
                                                      }),
                                                    ],
                                                  })
                                                : (0, G.jsx)(`span`, {
                                                    style: { color: `#ccc` },
                                                    children: `—`,
                                                  }),
                                          }),
                                          (0, G.jsx)(`td`, {
                                            style: V.td,
                                            children: (0, G.jsxs)(`button`, {
                                              onClick: () =>
                                                y(v === e._id ? null : e._id),
                                              style: {
                                                background: `none`,
                                                border: `none`,
                                                cursor: `pointer`,
                                                fontFamily: `'DM Sans', sans-serif`,
                                                fontSize: `13px`,
                                                color: `#8b7355`,
                                                fontWeight: `600`,
                                                padding: 0,
                                              },
                                              children: [
                                                e.items?.length || 0,
                                                ` item`,
                                                e.items?.length === 1
                                                  ? ``
                                                  : `s`,
                                                ` `,
                                                v === e._id ? `▲` : `▼`,
                                              ],
                                            }),
                                          }),
                                          (0, G.jsxs)(`td`, {
                                            style: {
                                              ...V.td,
                                              fontWeight: `600`,
                                            },
                                            children: [
                                              `₹`,
                                              e.totalAmount?.toLocaleString(
                                                `en-IN`,
                                              ),
                                            ],
                                          }),
                                          (0, G.jsx)(`td`, {
                                            style: V.td,
                                            children: (0, G.jsx)(`select`, {
                                              value: e.status,
                                              disabled: g === e._id,
                                              onChange: (t) =>
                                                re(e._id, t.target.value),
                                              style: {
                                                padding: `4px 10px`,
                                                borderRadius: `20px`,
                                                fontSize: `11px`,
                                                fontWeight: `700`,
                                                textTransform: `uppercase`,
                                                letterSpacing: `0.04em`,
                                                border: `none`,
                                                cursor: `pointer`,
                                                fontFamily: `'DM Sans', sans-serif`,
                                                outline: `none`,
                                                backgroundColor:
                                                  lt[e.status]?.bg || `#f5f5f5`,
                                                color:
                                                  lt[e.status]?.color || `#666`,
                                                opacity: g === e._id ? 0.5 : 1,
                                              },
                                              children: st.map((e) =>
                                                (0, G.jsx)(
                                                  `option`,
                                                  { value: e, children: e },
                                                  e,
                                                ),
                                              ),
                                            }),
                                          }),
                                          (0, G.jsx)(`td`, {
                                            style: {
                                              ...V.td,
                                              color: `#aaa`,
                                              fontSize: `12px`,
                                            },
                                            children: new Date(
                                              e.createdAt,
                                            ).toLocaleDateString(`en-IN`, {
                                              day: `numeric`,
                                              month: `short`,
                                              year: `numeric`,
                                            }),
                                          }),
                                        ],
                                      }),
                                      v === e._id &&
                                        (0, G.jsx)(`tr`, {
                                          children: (0, G.jsxs)(`td`, {
                                            colSpan: 6,
                                            style: V.expandedBg,
                                            children: [
                                              (0, G.jsx)(`div`, {
                                                style: {
                                                  ...V.itemsWrap,
                                                  borderBottom: `1px solid #ebebeb`,
                                                  paddingBottom: `14px`,
                                                },
                                                children: e.items?.map((e, t) =>
                                                  (0, G.jsxs)(
                                                    `div`,
                                                    {
                                                      style: V.itemCard,
                                                      children: [
                                                        (0, G.jsx)(`img`, {
                                                          src:
                                                            e.image ||
                                                            `https://placehold.co/36x36?text=?`,
                                                          alt: e.name,
                                                          style: V.itemImg,
                                                          onError: (e) => {
                                                            e.target.src = `https://placehold.co/36x36?text=?`;
                                                          },
                                                        }),
                                                        (0, G.jsxs)(`div`, {
                                                          children: [
                                                            (0, G.jsx)(`div`, {
                                                              style: V.itemName,
                                                              children: e.name,
                                                            }),
                                                            (0, G.jsxs)(`div`, {
                                                              style: V.itemMeta,
                                                              children: [
                                                                e.variant &&
                                                                  `${e.variant} · `,
                                                                `Qty: `,
                                                                e.quantity,
                                                                ` · ₹`,
                                                                e.price?.toLocaleString(
                                                                  `en-IN`,
                                                                ),
                                                              ],
                                                            }),
                                                          ],
                                                        }),
                                                      ],
                                                    },
                                                    t,
                                                  ),
                                                ),
                                              }),
                                              e.guestInfo?.phone &&
                                                (0, G.jsxs)(`div`, {
                                                  style: {
                                                    margin: `0 16px 0`,
                                                    padding: `10px 14px`,
                                                    background: `#fffbeb`,
                                                    border: `1px solid #fcd34d`,
                                                    borderRadius: `8px`,
                                                    fontSize: `12px`,
                                                    color: `#92400e`,
                                                    display: `flex`,
                                                    gap: `16px`,
                                                    flexWrap: `wrap`,
                                                    alignItems: `center`,
                                                  },
                                                  children: [
                                                    (0, G.jsxs)(`span`, {
                                                      children: [
                                                        `🧾 `,
                                                        (0, G.jsx)(`strong`, {
                                                          children: `Guest Order`,
                                                        }),
                                                      ],
                                                    }),
                                                    (0, G.jsxs)(`span`, {
                                                      children: [
                                                        `Name: `,
                                                        (0, G.jsx)(`strong`, {
                                                          children:
                                                            e.guestInfo.name,
                                                        }),
                                                      ],
                                                    }),
                                                    (0, G.jsxs)(`span`, {
                                                      children: [
                                                        `📞 `,
                                                        (0, G.jsx)(`strong`, {
                                                          children:
                                                            e.guestInfo.phone,
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              (0, G.jsxs)(`div`, {
                                                style: {
                                                  padding: `14px 16px`,
                                                  display: `flex`,
                                                  gap: `40px`,
                                                  flexWrap: `wrap`,
                                                },
                                                children: [
                                                  e.deliveryAddress
                                                    ? (0, G.jsxs)(`div`, {
                                                        children: [
                                                          (0, G.jsx)(`div`, {
                                                            style: {
                                                              fontSize: `10px`,
                                                              textTransform: `uppercase`,
                                                              letterSpacing: `0.08em`,
                                                              color: `#aaa`,
                                                              fontWeight: `700`,
                                                              marginBottom: `8px`,
                                                            },
                                                            children: `Delivery Address`,
                                                          }),
                                                          (0, G.jsxs)(`div`, {
                                                            style: {
                                                              background: `#fff`,
                                                              border: `1px solid #ebebeb`,
                                                              borderRadius: `8px`,
                                                              padding: `12px 16px`,
                                                              fontSize: `13px`,
                                                              lineHeight: `1.8`,
                                                              color: `#444`,
                                                              minWidth: `220px`,
                                                            },
                                                            children: [
                                                              (0, G.jsxs)(
                                                                `div`,
                                                                {
                                                                  style: {
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: `8px`,
                                                                    marginBottom: `4px`,
                                                                  },
                                                                  children: [
                                                                    (0, G.jsx)(
                                                                      `span`,
                                                                      {
                                                                        style: {
                                                                          fontWeight: `700`,
                                                                          color: `#1c1c1a`,
                                                                        },
                                                                        children:
                                                                          e
                                                                            .deliveryAddress
                                                                            .fullName,
                                                                      },
                                                                    ),
                                                                    (0, G.jsx)(
                                                                      `span`,
                                                                      {
                                                                        style: {
                                                                          padding: `1px 8px`,
                                                                          borderRadius: `20px`,
                                                                          background: `#f0ece6`,
                                                                          color: `#8b7355`,
                                                                          fontSize: `10px`,
                                                                          fontWeight: `700`,
                                                                          textTransform: `uppercase`,
                                                                        },
                                                                        children:
                                                                          e
                                                                            .deliveryAddress
                                                                            .addressType,
                                                                      },
                                                                    ),
                                                                  ],
                                                                },
                                                              ),
                                                              (0, G.jsxs)(
                                                                `div`,
                                                                {
                                                                  style: {
                                                                    fontSize: `12px`,
                                                                    color: `#888`,
                                                                    marginBottom: `6px`,
                                                                  },
                                                                  children: [
                                                                    `📞 `,
                                                                    e
                                                                      .deliveryAddress
                                                                      .mobile,
                                                                    e
                                                                      .deliveryAddress
                                                                      .alternateMobile &&
                                                                      (0,
                                                                      G.jsxs)(
                                                                        `span`,
                                                                        {
                                                                          style:
                                                                            {
                                                                              marginLeft: `8px`,
                                                                              color: `#bbb`,
                                                                            },
                                                                          children:
                                                                            [
                                                                              `Alt: `,
                                                                              e
                                                                                .deliveryAddress
                                                                                .alternateMobile,
                                                                            ],
                                                                        },
                                                                      ),
                                                                  ],
                                                                },
                                                              ),
                                                              (0, G.jsxs)(
                                                                `div`,
                                                                {
                                                                  children: [
                                                                    e
                                                                      .deliveryAddress
                                                                      .houseNo,
                                                                    `, `,
                                                                    e
                                                                      .deliveryAddress
                                                                      .street,
                                                                  ],
                                                                },
                                                              ),
                                                              e.deliveryAddress
                                                                .landmark &&
                                                                (0, G.jsx)(
                                                                  `div`,
                                                                  {
                                                                    children:
                                                                      e
                                                                        .deliveryAddress
                                                                        .landmark,
                                                                  },
                                                                ),
                                                              (0, G.jsxs)(
                                                                `div`,
                                                                {
                                                                  children: [
                                                                    e
                                                                      .deliveryAddress
                                                                      .city,
                                                                    `, `,
                                                                    e
                                                                      .deliveryAddress
                                                                      .state,
                                                                    ` — `,
                                                                    e
                                                                      .deliveryAddress
                                                                      .pincode,
                                                                  ],
                                                                },
                                                              ),
                                                              (0, G.jsx)(
                                                                `div`,
                                                                {
                                                                  children:
                                                                    e
                                                                      .deliveryAddress
                                                                      .country,
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                        ],
                                                      })
                                                    : (0, G.jsx)(`div`, {
                                                        style: {
                                                          fontSize: `12px`,
                                                          color: `#bbb`,
                                                          padding: `10px 0`,
                                                        },
                                                        children: `No delivery address recorded.`,
                                                      }),
                                                  e.note &&
                                                    (0, G.jsxs)(`div`, {
                                                      children: [
                                                        (0, G.jsx)(`div`, {
                                                          style: {
                                                            fontSize: `10px`,
                                                            textTransform: `uppercase`,
                                                            letterSpacing: `0.08em`,
                                                            color: `#aaa`,
                                                            fontWeight: `700`,
                                                            marginBottom: `8px`,
                                                          },
                                                          children: `Order Note`,
                                                        }),
                                                        (0, G.jsx)(`div`, {
                                                          style: {
                                                            background: `#fff`,
                                                            border: `1px solid #ebebeb`,
                                                            borderRadius: `8px`,
                                                            padding: `12px 16px`,
                                                            fontSize: `13px`,
                                                            color: `#555`,
                                                            maxWidth: `280px`,
                                                            lineHeight: `1.6`,
                                                          },
                                                          children: e.note,
                                                        }),
                                                      ],
                                                    }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                    ],
                                  },
                                  e._id,
                                ),
                              ),
                            }),
                          ],
                        }),
                }),
              f === `Products` &&
                (0, G.jsxs)(G.Fragment, {
                  children: [
                    (0, G.jsxs)(`div`, {
                      className: `adm-section-bar`,
                      children: [
                        (0, G.jsxs)(`span`, {
                          style: { fontSize: `13px`, color: `#888` },
                          children: [
                            s.length,
                            ` product`,
                            s.length === 1 ? `` : `s`,
                          ],
                        }),
                        !S &&
                          (0, G.jsx)(`button`, {
                            style: V.addBtn,
                            onClick: ie,
                            children: `+ Add Product`,
                          }),
                      ],
                    }),
                    S &&
                      (0, G.jsxs)(`div`, {
                        className: `adm-form-panel`,
                        children: [
                          (0, G.jsx)(`div`, {
                            style: V.formTitle,
                            children: w ? `Edit Product` : `Add New Product`,
                          }),
                          (0, G.jsxs)(`form`, {
                            onSubmit: le,
                            children: [
                              (0, G.jsxs)(`div`, {
                                className: `adm-form-grid`,
                                children: [
                                  (0, G.jsxs)(`div`, {
                                    className: `adm-form-full`,
                                    children: [
                                      (0, G.jsx)(`label`, {
                                        style: V.label,
                                        children: `Product Name *`,
                                      }),
                                      (0, G.jsx)(`input`, {
                                        name: `name`,
                                        value: E.name,
                                        onChange: z,
                                        required: !0,
                                        placeholder: `e.g. Classic Silk Saree`,
                                        style: V.input,
                                      }),
                                    ],
                                  }),
                                  (0, G.jsxs)(`div`, {
                                    children: [
                                      (0, G.jsx)(`label`, {
                                        style: V.label,
                                        children: `Category *`,
                                      }),
                                      (0, G.jsx)(`select`, {
                                        name: `category`,
                                        value: E.category,
                                        onChange: z,
                                        required: !0,
                                        style: V.input,
                                        children: ct.map((e) =>
                                          (0, G.jsx)(
                                            `option`,
                                            {
                                              value: e.value,
                                              children: e.label,
                                            },
                                            e.value,
                                          ),
                                        ),
                                      }),
                                    ],
                                  }),
                                  (0, G.jsxs)(`div`, {
                                    children: [
                                      (0, G.jsx)(`label`, {
                                        style: V.label,
                                        children: `Subcategory *`,
                                      }),
                                      (0, G.jsx)(`input`, {
                                        name: `subcategory`,
                                        value: E.subcategory,
                                        onChange: z,
                                        required: !0,
                                        placeholder: `e.g. printed-sarees`,
                                        style: V.input,
                                      }),
                                    ],
                                  }),
                                  (0, G.jsxs)(`div`, {
                                    children: [
                                      (0, G.jsx)(`label`, {
                                        style: V.label,
                                        children: `Size *`,
                                      }),
                                      (0, G.jsx)(`input`, {
                                        name: `size`,
                                        value: E.size,
                                        onChange: z,
                                        required: !0,
                                        placeholder: `e.g. Standard / 6 Yards`,
                                        style: V.input,
                                      }),
                                    ],
                                  }),
                                  (0, G.jsxs)(`div`, {
                                    children: [
                                      (0, G.jsx)(`label`, {
                                        style: V.label,
                                        children: `Stock *`,
                                      }),
                                      (0, G.jsx)(`input`, {
                                        name: `stock`,
                                        type: `number`,
                                        min: `0`,
                                        value: E.stock,
                                        onChange: z,
                                        required: !0,
                                        placeholder: `e.g. 25`,
                                        style: V.input,
                                      }),
                                    ],
                                  }),
                                  (0, G.jsxs)(`div`, {
                                    children: [
                                      (0, G.jsx)(`label`, {
                                        style: V.label,
                                        children: `MRP (₹) *`,
                                      }),
                                      (0, G.jsx)(`input`, {
                                        name: `price`,
                                        type: `number`,
                                        min: `1`,
                                        value: E.price,
                                        onChange: z,
                                        required: !0,
                                        placeholder: `e.g. 1299`,
                                        style: V.input,
                                      }),
                                    ],
                                  }),
                                  (0, G.jsxs)(`div`, {
                                    children: [
                                      (0, G.jsx)(`label`, {
                                        style: V.label,
                                        children: `Sale Price (₹) *`,
                                      }),
                                      (0, G.jsx)(`input`, {
                                        name: `discountPrice`,
                                        type: `number`,
                                        min: `1`,
                                        value: E.discountPrice,
                                        onChange: z,
                                        required: !0,
                                        placeholder: `e.g. 899`,
                                        style: V.input,
                                      }),
                                    ],
                                  }),
                                  (0, G.jsxs)(`div`, {
                                    className: `adm-form-full`,
                                    children: [
                                      (0, G.jsx)(`label`, {
                                        style: {
                                          ...V.label,
                                          marginBottom: `10px`,
                                        },
                                        children: `Product Images (up to 6) — slot 1 is the primary image`,
                                      }),
                                      (0, G.jsx)(`div`, {
                                        className: `adm-img-grid`,
                                        children: [0, 1, 2, 3, 4, 5].map(
                                          (e) => {
                                            let t = E.images[e]?.trim(),
                                              n = M[e],
                                              r = ee === e,
                                              i = B.createRef();
                                            return (0, G.jsxs)(
                                              `div`,
                                              {
                                                className: `adm-img-slot`,
                                                children: [
                                                  (0, G.jsxs)(`div`, {
                                                    className: `adm-drop-zone${t ? ` has-image` : ``}${n ? ` uploading` : ``}${r ? ` drag-over` : ``}`,
                                                    onClick: () =>
                                                      !n && i.current?.click(),
                                                    onDragOver: (t) => {
                                                      (t.preventDefault(),
                                                        P(e));
                                                    },
                                                    onDragLeave: () => P(null),
                                                    onDrop: (t) => ce(t, e),
                                                    children: [
                                                      (0, G.jsx)(`input`, {
                                                        ref: i,
                                                        type: `file`,
                                                        accept: `image/*`,
                                                        onChange: (t) => {
                                                          let n =
                                                            t.target.files[0];
                                                          (n && se(e, n),
                                                            (t.target.value = ``));
                                                        },
                                                      }),
                                                      n
                                                        ? (0, G.jsx)(`div`, {
                                                            className: `adm-upload-spinner`,
                                                          })
                                                        : t
                                                          ? (0, G.jsx)(`img`, {
                                                              src: t,
                                                              alt: `Slot ${e + 1}`,
                                                              className: `adm-img-preview`,
                                                              onError: (e) =>
                                                                (e.target.src = `https://placehold.co/120x120?text=ERR`),
                                                            })
                                                          : (0, G.jsxs)(
                                                              G.Fragment,
                                                              {
                                                                children: [
                                                                  (0, G.jsx)(
                                                                    `div`,
                                                                    {
                                                                      className: `adm-drop-icon`,
                                                                      children: `↑`,
                                                                    },
                                                                  ),
                                                                  (0, G.jsxs)(
                                                                    `div`,
                                                                    {
                                                                      className: `adm-drop-label`,
                                                                      children:
                                                                        [
                                                                          (0,
                                                                          G.jsx)(
                                                                            `strong`,
                                                                            {
                                                                              children: `Click or drop`,
                                                                            },
                                                                          ),
                                                                          (0,
                                                                          G.jsx)(
                                                                            `br`,
                                                                            {},
                                                                          ),
                                                                          `to upload`,
                                                                        ],
                                                                    },
                                                                  ),
                                                                ],
                                                              },
                                                            ),
                                                    ],
                                                  }),
                                                  e === 0 &&
                                                    (0, G.jsx)(`span`, {
                                                      className: `adm-slot-badge`,
                                                      children: `PRIMARY`,
                                                    }),
                                                  t &&
                                                    !n &&
                                                    (0, G.jsx)(`button`, {
                                                      type: `button`,
                                                      className: `adm-slot-remove`,
                                                      onClick: (t) => {
                                                        (t.stopPropagation(),
                                                          oe(e, ``));
                                                      },
                                                      title: `Remove image`,
                                                      children: `×`,
                                                    }),
                                                   (0, G.jsx)(`input`, {
                                                     type: `text`,
                                                     placeholder: `Variant color (e.g. Jet Black)`,
                                                     value: E.variants?.[e] || ``,
                                                     onChange: (t) => {
                                                       const val = t.target.value;
                                                       D((prev) => {
                                                         const newVariants = [...(prev.variants || [``, ``, ``, ``, ``, ``])];
                                                         newVariants[e] = val;
                                                         return { ...prev, variants: newVariants };
                                                       });
                                                     },
                                                     onClick: (t) => t.stopPropagation(),
                                                     style: {
                                                       width: `100%`,
                                                       fontSize: `11px`,
                                                       padding: `6px 8px`,
                                                       border: `1px solid #ddddd8`,
                                                       borderRadius: `4px`,
                                                       marginTop: `6px`,
                                                       boxSizing: `border-box`,
                                                       fontFamily: `inherit`
                                                     }
                                                   }),
                                                ],
                                              },
                                              e,
                                            );
                                          },
                                        ),
                                      }),
                                      (0, G.jsx)(`p`, {
                                        style: {
                                          fontSize: `11px`,
                                          color: `#aaa`,
                                          marginTop: `8px`,
                                        },
                                        children: `Drag & drop images or click each slot to browse. Max 8 MB per image. At least 1 required.`,
                                      }),
                                    ],
                                  }),
                                  (0, G.jsxs)(`div`, {
                                    className: `adm-form-full`,
                                    style: {
                                      borderTop: `1px solid #ebebeb`,
                                      paddingTop: `20px`,
                                      marginTop: `4px`,
                                    },
                                    children: [
                                      (0, G.jsx)(`div`, {
                                        style: {
                                          ...V.label,
                                          fontSize: `13px`,
                                          fontWeight: `700`,
                                          color: `#1c1c1a`,
                                          marginBottom: `16px`,
                                          letterSpacing: `0.05em`,
                                          textTransform: `uppercase`,
                                        },
                                        children: `Product Information (shown in accordion on product page)`,
                                      }),
                                      (0, G.jsxs)(`div`, {
                                        style: {
                                          display: `flex`,
                                          flexDirection: `column`,
                                          gap: `16px`,
                                        },
                                        children: [
                                          (0, G.jsxs)(`div`, {
                                            children: [
                                              (0, G.jsx)(`label`, {
                                                style: V.label,
                                                children: `Product Overview`,
                                              }),
                                              (0, G.jsx)(`textarea`, {
                                                name: `overview`,
                                                value: E.overview,
                                                onChange: z,
                                                rows: 4,
                                                placeholder: `• Bullet-point highlights about this product
• Each line starts with • for best display`,
                                                style: {
                                                  ...V.input,
                                                  resize: `vertical`,
                                                  lineHeight: `1.5`,
                                                },
                                              }),
                                            ],
                                          }),
                                          (0, G.jsxs)(`div`, {
                                            children: [
                                              (0, G.jsx)(`label`, {
                                                style: V.label,
                                                children: `Size & Fit`,
                                              }),
                                              (0, G.jsx)(`textarea`, {
                                                name: `sizeFit`,
                                                value: E.sizeFit,
                                                onChange: z,
                                                rows: 3,
                                                placeholder: `e.g. Size: Double (228 cm × 274 cm)
Fits mattress up to 8 inches deep`,
                                                style: {
                                                  ...V.input,
                                                  resize: `vertical`,
                                                  lineHeight: `1.5`,
                                                },
                                              }),
                                            ],
                                          }),
                                          (0, G.jsxs)(`div`, {
                                            children: [
                                              (0, G.jsx)(`label`, {
                                                style: V.label,
                                                children: `Material`,
                                              }),
                                              (0, G.jsx)(`textarea`, {
                                                name: `material`,
                                                value: E.material,
                                                onChange: z,
                                                rows: 3,
                                                placeholder: `e.g. Colour: White
Fabric: 100% Pure Cotton
Thread Count: 200`,
                                                style: {
                                                  ...V.input,
                                                  resize: `vertical`,
                                                  lineHeight: `1.5`,
                                                },
                                              }),
                                            ],
                                          }),
                                          (0, G.jsxs)(`div`, {
                                            children: [
                                              (0, G.jsx)(`label`, {
                                                style: V.label,
                                                children: `Care Guide`,
                                              }),
                                              (0, G.jsx)(`textarea`, {
                                                name: `careGuide`,
                                                value: E.careGuide,
                                                onChange: z,
                                                rows: 4,
                                                placeholder: `e.g. Machine wash cold
Use mild detergent
Do not bleach
Tumble dry low`,
                                                style: {
                                                  ...V.input,
                                                  resize: `vertical`,
                                                  lineHeight: `1.5`,
                                                },
                                              }),
                                            ],
                                          }),
                                          (0, G.jsxs)(`div`, {
                                            children: [
                                              (0, G.jsx)(`label`, {
                                                style: V.label,
                                                children: `Shipping & Refunds`,
                                              }),
                                              (0, G.jsx)(`textarea`, {
                                                name: `shippingRefund`,
                                                value: E.shippingRefund,
                                                onChange: z,
                                                rows: 4,
                                                placeholder: `Leave blank to use the default store-wide shipping & refund policy`,
                                                style: {
                                                  ...V.input,
                                                  resize: `vertical`,
                                                  lineHeight: `1.5`,
                                                },
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              A &&
                                (0, G.jsx)(`div`, {
                                  style: V.formError,
                                  children: A,
                                }),
                              (0, G.jsxs)(`div`, {
                                className: `adm-form-actions`,
                                children: [
                                  (0, G.jsx)(`button`, {
                                    type: `submit`,
                                    style: V.primaryBtn(O),
                                    disabled: O,
                                    children: O
                                      ? `Saving...`
                                      : w
                                        ? `Save Changes`
                                        : `Add Product`,
                                  }),
                                  (0, G.jsx)(`button`, {
                                    type: `button`,
                                    style: V.cancelBtn,
                                    onClick: R,
                                    children: `Cancel`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    (0, G.jsx)(`div`, {
                      style: {
                        ...V.tableWrap,
                        borderTop: `1px solid #ebebeb`,
                        borderRadius: `10px`,
                      },
                      children:
                        s.length === 0
                          ? (0, G.jsx)(`div`, {
                              style: V.empty,
                              children: `No products yet. Add your first one above.`,
                            })
                          : (0, G.jsxs)(`table`, {
                              style: { ...V.table, minWidth: `820px` },
                              children: [
                                (0, G.jsx)(`thead`, {
                                  children: (0, G.jsxs)(`tr`, {
                                    children: [
                                      (0, G.jsx)(`th`, {
                                        style: V.th,
                                        children: `Images`,
                                      }),
                                      (0, G.jsx)(`th`, {
                                        style: V.th,
                                        children: `Name`,
                                      }),
                                      (0, G.jsx)(`th`, {
                                        style: V.th,
                                        children: `Category`,
                                      }),
                                      (0, G.jsx)(`th`, {
                                        style: V.th,
                                        children: `Size`,
                                      }),
                                      (0, G.jsx)(`th`, {
                                        style: V.th,
                                        children: `MRP`,
                                      }),
                                      (0, G.jsx)(`th`, {
                                        style: V.th,
                                        children: `Sale Price`,
                                      }),
                                      (0, G.jsx)(`th`, {
                                        style: V.th,
                                        children: `Discount`,
                                      }),
                                      (0, G.jsx)(`th`, {
                                        style: V.th,
                                        children: `Stock`,
                                      }),
                                      (0, G.jsx)(`th`, {
                                        style: V.th,
                                        children: `Actions`,
                                      }),
                                    ],
                                  }),
                                }),
                                (0, G.jsx)(`tbody`, {
                                  children: s.map((e) => {
                                    let t =
                                      e.images?.length > 0
                                        ? e.images
                                        : [e.image].filter(Boolean);
                                    return (0, G.jsxs)(
                                      `tr`,
                                      {
                                        children: [
                                          (0, G.jsx)(`td`, {
                                            style: V.td,
                                            children: (0, G.jsx)(`div`, {
                                              style: {
                                                display: `flex`,
                                                gap: `4px`,
                                                flexWrap: `wrap`,
                                                maxWidth: `100px`,
                                              },
                                              children: t
                                                .slice(0, 4)
                                                .map((e, t) =>
                                                  (0, G.jsx)(
                                                    `img`,
                                                    {
                                                      src:
                                                        e ||
                                                        `https://placehold.co/30x30?text=?`,
                                                      alt: ``,
                                                      style: {
                                                        width: `30px`,
                                                        height: `30px`,
                                                        objectFit: `cover`,
                                                        borderRadius: `4px`,
                                                        border: `1px solid #ebebeb`,
                                                      },
                                                      onError: (e) => {
                                                        e.target.src = `https://placehold.co/30x30?text=?`;
                                                      },
                                                    },
                                                    t,
                                                  ),
                                                ),
                                            }),
                                          }),
                                          (0, G.jsxs)(`td`, {
                                            style: {
                                              ...V.td,
                                              maxWidth: `180px`,
                                            },
                                            children: [
                                              (0, G.jsx)(`div`, {
                                                style: {
                                                  fontWeight: `500`,
                                                  whiteSpace: `nowrap`,
                                                  overflow: `hidden`,
                                                  textOverflow: `ellipsis`,
                                                },
                                                children: e.name,
                                              }),
                                              (0, G.jsx)(`div`, {
                                                style: {
                                                  fontSize: `11px`,
                                                  color: `#bbb`,
                                                  marginTop: `2px`,
                                                },
                                                children: e.subcategory,
                                              }),
                                            ],
                                          }),
                                          (0, G.jsx)(`td`, {
                                            style: {
                                              ...V.td,
                                              textTransform: `capitalize`,
                                              color: `#888`,
                                            },
                                            children: e.category,
                                          }),
                                          (0, G.jsx)(`td`, {
                                            style: {
                                              ...V.td,
                                              color: `#888`,
                                              fontSize: `12px`,
                                            },
                                            children: e.size,
                                          }),
                                          (0, G.jsxs)(`td`, {
                                            style: {
                                              ...V.td,
                                              color: `#aaa`,
                                              textDecoration: `line-through`,
                                              fontSize: `12px`,
                                            },
                                            children: [
                                              `₹`,
                                              e.price?.toLocaleString(`en-IN`),
                                            ],
                                          }),
                                          (0, G.jsxs)(`td`, {
                                            style: {
                                              ...V.td,
                                              fontWeight: `600`,
                                            },
                                            children: [
                                              `₹`,
                                              e.discountPrice?.toLocaleString(
                                                `en-IN`,
                                              ),
                                            ],
                                          }),
                                          (0, G.jsx)(`td`, {
                                            style: V.td,
                                            children: (0, G.jsxs)(`span`, {
                                              style: {
                                                display: `inline-block`,
                                                padding: `2px 8px`,
                                                borderRadius: `20px`,
                                                fontSize: `10px`,
                                                fontWeight: `700`,
                                                backgroundColor: `#e8f5e9`,
                                                color: `#2e7d32`,
                                              },
                                              children: [
                                                e.discountPercent,
                                                `% off`,
                                              ],
                                            }),
                                          }),
                                          (0, G.jsx)(`td`, {
                                            style: {
                                              ...V.td,
                                              fontWeight:
                                                e.stock < 5 ? `700` : `400`,
                                              color:
                                                e.stock < 5
                                                  ? `#c62828`
                                                  : `#333`,
                                            },
                                            children: e.stock,
                                          }),
                                          (0, G.jsx)(`td`, {
                                            style: V.td,
                                            children: (0, G.jsxs)(`div`, {
                                              style: {
                                                display: `flex`,
                                                gap: `6px`,
                                              },
                                              children: [
                                                (0, G.jsx)(`button`, {
                                                  style:
                                                    V.outlineBtn(`#8b7355`),
                                                  onClick: () => ae(e),
                                                  children: `Edit`,
                                                }),
                                                (0, G.jsx)(`button`, {
                                                  style:
                                                    V.outlineBtn(`#c62828`),
                                                  disabled: b === e._id,
                                                  onClick: () => ue(e._id),
                                                  children:
                                                    b === e._id
                                                      ? `...`
                                                      : `Delete`,
                                                }),
                                              ],
                                            }),
                                          }),
                                        ],
                                      },
                                      e._id,
                                    );
                                  }),
                                }),
                              ],
                            }),
                    }),
                  ],
                }),
            ],
          }),
        ],
      });
}
var ft = ({ children: e }) => {
  let t = (() => {
    try {
      return JSON.parse(localStorage.getItem(`user`) || `null`);
    } catch {
      return null;
    }
  })();
  return !t || t.role !== `admin` ? (0, G.jsx)(c, { to: `/`, replace: !0 }) : e;
};
function pt() {
  let [e, t] = (0, B.useState)([]);
  return (
    (0, B.useEffect)(() => {
      const load = () => {
        fetch(`${H}/products?v=nocache`)
          .then((e) => e.json())
          .then(t)
          .catch(console.error);
      };
      load();
      window.addEventListener("productsUpdated", load);
      return () => window.removeEventListener("productsUpdated", load);
    }, []),
    (0, G.jsxs)(`div`, {
      className: `site-root`,
      style: {
        display: `flex`,
        flexDirection: `column`,
        minHeight: `100vh`,
        overflow: `visible`,
      },
      children: [
        (0, G.jsx)(ke, {}),
        (0, G.jsx)(Oe, {}),
        (0, G.jsx)(Ae, {}),
        (0, G.jsx)(`main`, {
          className: `app-main-content`,
          style: { flex: `1 0 auto`, minHeight: `70vh` },
          children: (0, G.jsxs)(S, {
            children: [
              (0, G.jsx)(b, {
                path: `/`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(tt, {}),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/products`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(ot, { products: e }),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/products/:category`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(ot, { products: e }),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/product/:id`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(Ee, { products: e }),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/cart`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(Le, {}),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/orders`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(nt, {}),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/new-arrivals`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(ze, { products: e }),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/admin`,
                element: (0, G.jsx)(ft, {
                  children: (0, G.jsx)(`div`, {
                    className: `page-enter`,
                    children: (0, G.jsx)(dt, {}),
                  }),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/shipping-policy`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(Be, {}),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/terms-and-conditions`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(Ve, {}),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/return-policy`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(He, {}),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/terms-of-service`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(Ue, {}),
                }),
              }),
              (0, G.jsx)(b, {
                path: `/contact`,
                element: (0, G.jsx)(`div`, {
                  className: `page-enter`,
                  children: (0, G.jsx)(We, {}),
                }),
              }),
            ],
          }),
        }),
        (0, G.jsx)(je, {}),
        (0, G.jsx)(`a`, {
          href: `https://wa.me/919633521642`,
          target: `_blank`,
          rel: `noopener noreferrer`,
          "aria-label": `Chat on WhatsApp`,
          style: {
            position: `fixed`,
            bottom: `24px`,
            right: `24px`,
            zIndex: 9999,
            width: `56px`,
            height: `56px`,
            borderRadius: `50%`,
            background: `#25D366`,
            boxShadow: `0 4px 16px rgba(37,211,102,0.45)`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            transition: `transform 0.2s ease, box-shadow 0.2s ease`,
          },
          onMouseEnter: (e) => {
            ((e.currentTarget.style.transform = `scale(1.1)`),
              (e.currentTarget.style.boxShadow = `0 6px 22px rgba(37,211,102,0.55)`));
          },
          onMouseLeave: (e) => {
            ((e.currentTarget.style.transform = `scale(1)`),
              (e.currentTarget.style.boxShadow = `0 4px 16px rgba(37,211,102,0.45)`));
          },
          children: (0, G.jsx)(`svg`, {
            width: `30`,
            height: `30`,
            viewBox: `0 0 32 32`,
            fill: `none`,
            xmlns: `http://www.w3.org/2000/svg`,
            children: (0, G.jsx)(`path`, {
              fillRule: `evenodd`,
              clipRule: `evenodd`,
              d: `M16 3C9.373 3 4 8.373 4 15c0 2.385.67 4.61 1.832 6.5L4 29l7.697-1.808A11.95 11.95 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm-3.5 7.5c-.28 0-.735.1-1.12.51-.384.41-1.47 1.437-1.47 3.506s1.505 4.063 1.714 4.344c.21.28 2.944 4.67 7.22 6.358 1.007.387 1.792.617 2.403.791.01.003.022.005.033.007.606.163 1.158.14 1.594.085.486-.063 1.497-.612 1.71-1.202.21-.59.21-1.095.147-1.202-.063-.106-.231-.168-.484-.294-.252-.126-1.49-.736-1.72-.82-.231-.084-.4-.126-.568.126-.168.252-.651.82-.797.988-.147.168-.294.19-.547.063-.252-.126-1.065-.393-2.028-1.25-.75-.668-1.257-1.494-1.404-1.746-.147-.252-.016-.388.11-.514.114-.113.252-.294.378-.44.126-.148.168-.253.252-.421.084-.168.042-.315-.021-.44-.063-.127-.568-1.372-.778-1.878-.205-.493-.413-.426-.568-.434l-.484-.008A.929.929 0 0012.5 10.5z`,
              fill: `#fff`,
            }),
          }),
        }),
      ],
    })
  );
}
(0, V.createRoot)(document.getElementById(`root`)).render(
  (0, G.jsx)(B.StrictMode, {
    children: (0, G.jsx)(n, { children: (0, G.jsx)(pt, {}) }),
  }),
);
