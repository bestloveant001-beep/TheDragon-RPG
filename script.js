// รายชื่อสถานการณ์จำลอง
const scenarios = [
    {
        img: "🧓",
        title: "พบขอทานชรา",
        desc: "ท่านพบขอทานชรานั่งอยู่ข้างทาง เขาขอเศษเงินท่าน 500 Gold เพื่อซื้ออาหาร",
        choices: [
            { text: "ให้เงิน 500 Gold (เมตตา)", action: () => { 
                if(p.coin >= 500) { p.coin -= 500; p.exp += 100; addLog("✨ ท่านได้รับพรจากผู้เฒ่า! EXP +100"); }
                else { alert("ทองไม่พอ!"); return false; }
            }},
            { text: "เดินหนี (เย็นชา)", action: () => { addLog("👣 ท่านเดินจากไปอย่างเงียบๆ"); }}
        ]
    },
    {
        img: "⚔️",
        title: "โจรป่าดักซุ่ม",
        desc: "มีกลุ่มโจรดักซุ่มโจมตีท่านระหว่างเดินทาง!",
        choices: [
            { text: "เข้าปะทะ (สู้ตาย)", action: () => { 
                p.coin += 2000; p.exp += 50; addLog("⚔️ ชนะโจรป่า! ได้รับ 2,000 Gold"); 
            }},
            { text: "จ่ายเงินค่าผ่านทาง (1,000 Gold)", action: () => { 
                if(p.coin >= 1000) { p.coin -= 1000; addLog("💸 เสียเงินฟาดหัวโจรไป 1,000 Gold"); }
                else { alert("ทองไม่พอต้องสู้!"); return false; }
            }}
        ]
    },
    {
        img: "📜",
        title: "คัมภีร์ลับในถ้ำ",
        desc: "ท่านพบถ้ำลับที่มีคัมภีร์เก่าแก่ตกอยู่ จะลองฝึกดูหรือไม่?",
        choices: [
            { text: "ลองฝึกตามคัมภีร์", action: () => { 
                if(Math.random() > 0.5) { p.rank += 1; addLog("⚡ ท่านสำเร็จวิชาลับ! เลเวล +1"); }
                else { p.exp -= 20; addLog("💢 ธาตุไฟเข้าแทรก! เสีย EXP นิดหน่อย"); }
            }},
            { text: "เผาทิ้งป้องกันมารร้าย", action: () => { p.coin += 5000; addLog("🔥 ท่านทำลายคัมภีร์และพบทองซ่อนอยู่ใต้กองไฟ!"); }}
        ]
    }
];

// ฟังก์ชันสุ่มเรียกสถานการณ์
function triggerScenario() {
    const s = scenarios[Math.floor(Math.random() * scenarios.length)];
    document.getElementById('scenario-title').innerText = s.title;
    document.getElementById('scenario-img').innerText = s.img;
    document.getElementById('scenario-desc').innerText = s.desc;
    
    const container = document.getElementById('scenario-choices');
    container.innerHTML = ""; // ล้างปุ่มเก่า
    
    s.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.innerText = choice.text;
        btn.onclick = () => {
            if(choice.action() !== false) {
                closeScenario();
                updateUI();
                saveData();
            }
        };
        container.appendChild(btn);
    });
    
    document.getElementById('scenario-modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeScenario() {
    document.getElementById('scenario-modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
