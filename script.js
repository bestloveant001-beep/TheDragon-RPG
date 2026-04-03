// ข้อมูลตัวละคร (เพิ่มระบบตำหนักและบอส)
let p = { 
    name: "", pass: "", rank: 1, exp: 0, coin: 0, 
    isAdmin: false, mansion: "เพิงพักไม้", autoExp: 0 
};

let boss = { hp: 50000, mHp: 50000, active: false };

// --- 1. ระบบ Login & Register ---
function handleAuth() {
    let u = document.getElementById('uid').value;
    let pass = document.getElementById('pid').value;
    if(!u || !pass) return alert("กรุณากรอกข้อมูล!");

    if(u === "admin" && pass === "1234") {
        p.isAdmin = true;
        p.coin = 9999999;
    }
    p.name = u; p.pass = pass;
    saveData();
    enterGame();
}

function enterGame() {
    document.getElementById('p-name').innerText = "ท่าน " + p.name;
    if(p.isAdmin) document.getElementById('p-admin-tag').style.display = 'inline';
    startAutoCultivate(); // เริ่มระบบฟื้นฟูอัตโนมัติจากตำหนัก
    updateUI();
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
}

// --- 2. ระบบบ่มเพาะ & ตำหนัก (Auto EXP) ---
function train() {
    p.exp += (20 + (p.autoExp * 2));
    p.coin += 100;
    checkRank();
    updateUI();
}

function startAutoCultivate() {
    setInterval(() => {
        if(p.autoExp > 0) {
            p.exp += p.autoExp;
            checkRank();
            updateUI();
        }
    }, 3000); // เพิ่ม EXP ทุก 3 วินาทีตามระดับตำหนัก
}

function checkRank() {
    if(p.exp >= 100) { p.rank++; p.exp = 0; addLog(`⚡ เลื่อนระดับเป็นขั้น ${p.rank}!`); saveData(); }
}

// --- 3. ระบบร้านค้า & อสังหาริมทรัพย์ ---
function buyMansion(name, price, autoRate) {
    if(p.coin >= price) {
        p.coin -= price;
        p.mansion = name;
        p.autoExp = autoRate;
        addLog(`🏰 ยินดีด้วย! ท่านซื้อ [${name}] สำเร็จ (ได้ EXP อัตโนมัติ +${autoRate})`);
        updateUI();
        saveData();
    } else { alert("ทองไม่พอซื้อตำหนักนี้!"); }
}

// --- 4. ระบบ World Boss (สำหรับ Admin เรียก) ---
function spawnWorldBoss() {
    if(!p.isAdmin) return alert("เฉพาะแอดมินที่เรียกบอสได้!");
    boss.active = true;
    boss.hp = boss.mHp;
    document.getElementById('world-boss-ui').style.display = 'block';
    addLog("⚠️ แอดมินเรียก [เทพมังกรบรรพกาล] ออกมาจุติ! ทุกคนรุมสู้เร็ว!");
    updateUI();
}

function attackWorldBoss() {
    let dmg = 500 + (p.rank * 10);
    boss.hp -= dmg;
    addLog(`⚔️ ท่านสร้างความเสียหายแก่บอส ${dmg} หน่วย!`);
    if(boss.hp <= 0) {
        boss.hp = 0; boss.active = false;
        p.coin += 100000;
        addLog("🏆 บอสถูกกำจัดแล้ว! ท่านได้รับรางวัล 100,000 Gold");
        document.getElementById('world-boss-ui').style.display = 'none';
    }
    updateUI();
}

// --- ฟังก์ชันเสริม ---
function updateUI() {
    document.getElementById('p-coin').innerText = p.coin.toLocaleString();
    document.getElementById('p-rank-text').innerText = "ระดับ: " + p.rank;
    document.getElementById('p-mansion').innerText = p.mansion;
    document.getElementById('exp-bar').style.width = p.exp + "%";
    
    if(boss.active) {
        document.getElementById('boss-hp-text').innerText = `BOSS HP: ${boss.hp}/${boss.mHp}`;
        document.getElementById('boss-bar').style.width = (boss.hp/boss.mHp)*100 + "%";
    }
}

function saveData() { localStorage.setItem('dragon_user', JSON.stringify(p)); }
function addLog(msg) {
    let log = document.getElementById('log');
    log.innerHTML = `> ${msg}<br>` + log.innerHTML;
}
