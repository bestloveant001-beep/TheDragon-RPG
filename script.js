// ข้อมูลตัวละครเริ่มต้น
let p = { name: "", pass: "", rank: 1, exp: 0, coin: 0, isAdmin: false };

// --- 1. ระบบสมัครสมาชิก & ล็อกอิน ---
function handleAuth() {
    let u = document.getElementById('uid').value;
    let pass = document.getElementById('pid').value;
    if(!u || !pass) return alert("กรุณากรอกข้อมูลให้ครบ!");

    // เช็ค Admin ลับ
    if(u === "admin" && pass === "1234") {
        p.isAdmin = true;
        p.coin = 999999;
        addLog("👑 ยินดีต้อนรับท่านแอดมิน!");
    }

    p.name = u;
    p.pass = pass;
    saveData();
    enterGame();
}

function enterGame() {
    document.getElementById('p-name').innerText = "ท่าน " + p.name;
    if(p.isAdmin) document.getElementById('p-admin-tag').style.display = 'inline';
    updateUI();
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
}

function saveData() {
    localStorage.setItem('dragon_user', JSON.stringify(p));
}

// --- 2. ระบบร้านค้า ---
function openShop() {
    document.getElementById('shop-modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeShop() {
    document.getElementById('shop-modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function buyItem(item, price) {
    if(p.coin >= price) {
        p.coin -= price;
        if(item === 'medicine') { p.exp += 50; addLog("💊 ใช้ยาทิพย์! EXP +50"); }
        if(item === 'sword') { addLog("⚔️ ซื้อกระบี่เหล็ก! พลังโจมตีเพิ่มขึ้น"); }
        updateUI();
        saveData();
    } else {
        alert("ทองไม่พอท่านจอมยุทธ์!");
    }
}

// --- 3. ระบบแอดมิน ---
function toggleAdmin() {
    let panel = document.getElementById('admin-panel');
    if(p.isAdmin) {
        panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
    } else {
        alert("เฉพาะแอดมินเท่านั้น!");
    }
}

function addCoin(amt) { p.coin += amt; updateUI(); saveData(); addLog(`🛠️ ADMIN: เสกทอง ${amt}`); }

// --- ฟังก์ชันเสริม ---
function updateUI() {
    document.getElementById('p-coin').innerText = p.coin;
    document.getElementById('p-rank-text').innerText = "ระดับ: รวบรวมปราณ ขั้น " + p.rank;
    document.getElementById('exp-bar').style.width = p.exp + "%";
}

function addLog(msg) {
    let log = document.getElementById('log');
    log.innerHTML = `> ${msg}<br>` + log.innerHTML;
}
