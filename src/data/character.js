// Single source of truth for ABYSSAL KING. Both the "Biology → Fiction"
// section and the classified dossier read from here, so the character's
// facts cannot drift apart between sections.

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

export const ART = {
  humanScientist: { src: asset('images/panels/human-scientist.webp'), w: 600, h: 876 },
  labTank: { src: asset('images/panels/lab-tank.webp'), w: 700, h: 945 },
  transformScream: { src: asset('images/panels/transform-scream.webp'), w: 900, h: 573 },
  awakenedEye: { src: asset('images/panels/awakened-eye.webp'), w: 900, h: 482 },
  kingReveal: { src: asset('images/panels/king-reveal.webp'), w: 1200, h: 1300 },
  humanPortrait: { src: asset('images/panels/human-portrait.webp'), w: 500, h: 959 },
  kingFace: { src: asset('images/panels/king-face.webp'), w: 560, h: 821 },
  kingRoar: { src: asset('images/panels/king-roar.webp'), w: 900, h: 387 },
  humanCutout: { src: asset('images/panels/human-cutout.webp'), w: 460, h: 1636 },
  kingCutout: { src: asset('images/panels/king-cutout.webp'), w: 1000, h: 1348 },
}

export const PROFILE = {
  name: 'ABYSSAL KING',
  thaiTitle: 'ราชันแห่งห้วงลึก',
  quirk: 'DEEP SEA PREDATOR',
  classification: 'LEVIATHAN-CLASS',
  formerIdentity: 'นักวิทยาศาสตร์หนุ่มของ Project Leviathan',
  realName: 'ถูกลบออกจากระบบ',
  origin: 'Project Leviathan — ฐานวิจัยลับใต้ทะเลลึก',
  species: 'มนุษย์ที่ถูกผสาน DNA วาฬหัวทุย (สิ่งมีชีวิตสมมติ)',
  status: 'หลบหนี · ไม่ทราบตำแหน่ง',
  heightHuman: 1.83,
  heightKing: 3.4,
}

export const PERSONALITY = {
  traits: [
    { en: 'COLD', th: 'เยือกเย็น' },
    { en: 'GENIUS', th: 'ฉลาดล้ำ' },
    { en: 'PROUD', th: 'หยิ่งทะนง' },
    { en: 'CALM', th: 'สงบนิ่ง' },
    { en: 'IMPOSING', th: 'น่าเกรงขาม' },
  ],
  summary:
    'อดีตนักวิทยาศาสตร์ผู้ใฝ่หาความจริง พูดน้อย คิดเป็นขั้นตอน และไม่เคยรีบร้อน หลังการกลายร่าง เขามองมนุษย์เป็นเพียง “การทดลองที่จบไปแล้ว” และมุ่งมั่นจะครอบครองโลกจากใต้ทะเลลึก',
  quotes: ['“…แค่การทดลอง มันก็จบแล้ว”', '“จงจมลงสู่ห้วงลึก… ตลอดกาล”'],
}

/**
 * 7 abilities. Each maps a REAL biological fact to a FICTIONAL ability.
 * basis: 3 = strongly inspired by real biology, 2 = partly, 1 = mostly fantasy.
 */
export const ABILITIES = [
  {
    id: 'echo',
    name: 'ECHO DOMINION',
    th: 'ครองโลกด้วยเสียงสะท้อน',
    icon: 'Radar',
    desc: 'มองเห็นทุกทิศทางด้วยเสียง แม้อยู่ในความมืดสนิท',
    real: 'วาฬหัวทุยส่งเสียงคลิกแล้วฟังเสียงสะท้อน (echolocation) เพื่อหาหมึกในทะเลลึกที่มืดสนิท',
    fiction: 'มองเห็นรอบตัว 360° ทะลุกำแพง และ “ได้ยิน” เสียงหัวใจของศัตรูจากระยะไกล',
    basis: 3,
  },
  {
    id: 'pressure-body',
    name: 'ABYSSAL PRESSURE BODY',
    th: 'ร่างทนแรงดันห้วงลึก',
    icon: 'ShieldHalf',
    desc: 'ร่างกายทนแรงดันมหาศาลและแรงกระแทกรุนแรงได้',
    real: 'ซี่โครงยืดหยุ่นและปอดยุบตัวได้ ทำให้ดำได้ลึกกว่า 2,000 เมตร ซึ่งมีแรงดันราว 200 เท่าของผิวน้ำ',
    fiction: 'ทนแรงดันของร่องลึกที่สุดในโลกได้สบาย และใช้ร่างกายรับแรงกระแทกเหมือนเกราะ',
    basis: 3,
  },
  {
    id: 'lungs',
    name: 'LEVIATHAN LUNGS',
    th: 'คลังออกซิเจนแห่งเลวีอาธาน',
    icon: 'Wind',
    desc: 'กลั้นหายใจและต่อสู้ใต้น้ำได้นานผิดมนุษย์',
    real: 'เก็บออกซิเจนไว้ในเลือดและกล้ามเนื้อซึ่งมีไมโอโกลบินสูง ดำน้ำได้ราว 1 ชั่วโมง และมีบันทึกนานกว่า 90 นาที',
    fiction: 'กลั้นหายใจต่อสู้ใต้น้ำได้หลายชั่วโมงโดยไม่อ่อนแรง',
    basis: 3,
  },
  {
    id: 'sonic',
    name: 'SPERMACETI SONIC BURST',
    th: 'คลื่นเสียงสเปอร์มาเซติ',
    icon: 'AudioWaveform',
    desc: 'ปล่อยคลื่นเสียงรวมศูนย์จากหน้าผาก ทำให้ศัตรูมึนงง',
    real: 'เสียงคลิกของวาฬหัวทุยดังได้ราว 230 เดซิเบล (วัดในน้ำ) เป็นเสียงที่ดังที่สุดในอาณาจักรสัตว์ — ส่วนแนวคิดว่าเสียงใช้ “ทำให้เหยื่อมึน” ยังเป็นเพียงสมมติฐานที่ไม่มีหลักฐานยืนยัน',
    fiction: 'ยิงคลื่นเสียงที่แรงพอจะทำให้ศัตรูหมดสติและทำให้เหล็กกล้าแตกร้าว',
    basis: 2,
  },
  {
    id: 'strength',
    name: 'LEVIATHAN STRENGTH',
    th: 'พลังมหาศาล',
    icon: 'BicepsFlexed',
    desc: 'พละกำลังมหาศาล ยกและพุ่งชนด้วยแรงหลายสิบตัน',
    real: 'วาฬหัวทุยตัวผู้หนักได้กว่า 40 ตัน และมีบันทึกประวัติศาสตร์ว่าวาฬหัวทุยพุ่งชนเรือล่าวาฬ Essex จนจม (ค.ศ. 1820)',
    fiction: 'ร่างสูง 3.4 เมตรแต่มีพลังเทียบเท่าวาฬทั้งตัว — ตามหลักฟิสิกส์เป็นไปไม่ได้',
    basis: 2,
  },
  {
    id: 'bio-energy',
    name: 'BIO-ENERGY CONTROL',
    th: 'การควบคุมพลังงานชีวภาพ',
    icon: 'Zap',
    desc: 'ลายเรืองแสงสีฟ้าเก็บสะสมและปลดปล่อยพลังงาน',
    real: 'วาฬหัวทุยเรืองแสงไม่ได้ แต่สัตว์ทะเลลึกหลายชนิด รวมถึงหมึกบางชนิดซึ่งเป็นเหยื่อของวาฬ สร้างแสงเองได้ (bioluminescence)',
    fiction: 'ลายสีฟ้าบนร่างเป็นแหล่งพลังงานที่ใช้เสริมพลังโจมตี — เป็นจินตนาการเกือบทั้งหมด',
    basis: 1,
  },
  {
    id: 'pressure-burst',
    name: 'PRESSURE BURST',
    th: 'การโจมตีด้วยแรงดันน้ำ',
    icon: 'Waves',
    desc: 'อัดน้ำรอบตัวเป็นกระสุนแรงดันสูง',
    real: 'ทุกความลึก 10 เมตร แรงดันน้ำเพิ่มขึ้นประมาณ 1 บรรยากาศ — ที่ความลึก 1,000 เมตร แรงดันจึงสูงราว 100 บรรยากาศ',
    fiction: 'ควบคุมแรงดันน้ำด้วยเจตจำนงและยิงออกไปเป็นอาวุธ — แฟนตาซีล้วน',
    basis: 1,
  },
]

export const ULTIMATES = [
  {
    name: 'ABYSSAL CROWN BREAKER',
    desc: 'พุ่งชนด้วยหน้าผากสเปอร์มาเซติด้วยความเร็วสูงสุด ทำลายกำแพงเหล็กได้ในครั้งเดียว',
    inspired: 'ศีรษะขนาดใหญ่ของวาฬ และเหตุการณ์เรือ Essex',
  },
  {
    name: 'LEVIATHAN SONAR CANNON',
    desc: 'รวมคลื่นเสียงทั้งหมดไว้ในหน้าผาก แล้วยิงออกเป็นลำคลื่นเสียงแรงสูง',
    inspired: 'เสียงคลิกที่ดังที่สุดในอาณาจักรสัตว์',
  },
  {
    name: 'DEEP PRESSURE COLLAPSE',
    desc: 'สร้างโดเมนแรงดันเทียบเท่าความลึก 2,000 เมตร บดขยี้ทุกสิ่งในรัศมี',
    inspired: 'แรงดันมหาศาลในห้วงลึก',
  },
  {
    name: 'BLACK TIDE DOMAIN',
    desc: 'กลืนสนามรบด้วยความมืดของห้วงลึก ศัตรูมองไม่เห็น แต่เขา “มองเห็น” ด้วยเสียง',
    inspired: 'การล่าด้วย echolocation ใน Midnight Zone',
  },
  {
    name: 'KRAKEN REAPER',
    desc: 'ฟาดกรงเล็บต่อเนื่องอย่างแม่นยำ เหมือนนักล่าที่ไล่ล่าหมึกยักษ์ในความมืด',
    inspired: 'การล่าหมึกยักษ์และรอยแผลจากปุ่มดูดบนผิววาฬ',
  },
  {
    name: 'ETERNAL DESCENT',
    desc: 'ท่าไม้ตายสุดท้าย — ลากศัตรูดิ่งลงสู่ก้นทะเล “จงจมลงสู่ห้วงลึก… ตลอดกาล”',
    inspired: 'การดำดิ่งลึกกว่า 2,000 เมตร',
  },
]

export const WEAKNESSES = [
  {
    name: 'ENERGY DEPLETION',
    th: 'พลังงานหมด',
    desc: 'เมื่อใช้พลังต่อเนื่อง ลายเรืองแสงจะหรี่ลง — สัญญาณว่าพลังเกือบหมดและเขาอ่อนแอลง',
  },
  {
    name: 'SURFACE DEPENDENCY',
    th: 'ต้องขึ้นมาหายใจ',
    desc: 'ไม่มีเหงือก หายใจด้วยปอดเหมือนวาฬจริง หลังสู้ใต้น้ำนาน ๆ ต้องกลับขึ้นผิวน้ำ',
  },
  {
    name: 'SONIC OVERLOAD',
    th: 'เสียงรบกวนรุนแรง',
    desc: 'เสียงความถี่สูงที่ดังมาก ๆ ทำให้ระบบ echolocation สับสน — คล้ายกับที่เสียงจากเรือและโซนาร์รบกวนวาฬจริง',
  },
  {
    name: 'ARMOR JOINT WEAK POINTS',
    th: 'จุดอ่อนที่รอยต่อเกราะ',
    desc: 'เกราะชีวภาพแข็งแกร่ง แต่รอยต่อที่ลำคอและข้อต่อเป็นจุดที่การโจมตีแม่นยำเจาะเข้าได้',
  },
  {
    name: 'RAPID DECOMPRESSION',
    th: 'แรงดันเปลี่ยนกะทันหัน',
    desc: 'ถ้าถูกดึงขึ้นจากที่ลึกเร็วเกินไป ร่างกายจะบาดเจ็บ — นักวิทยาศาสตร์เคยพบร่องรอยความเสียหายของกระดูกจากแรงดันในวาฬหัวทุยจริง',
  },
]

/** Anatomy hotspots on the king cutout (percent coords of the image). */
export const ANATOMY = [
  { id: 'crown', x: 56, y: 3, name: 'SPERMACETI CROWN', desc: 'หน้าผากโค้งขนาดมหึมา เลียนแบบอวัยวะสเปอร์มาเซติ — ศูนย์กลางของพลังเสียง' },
  { id: 'eyes', x: 66, y: 9.5, name: 'SONAR EYES', desc: 'ดวงตาสีฟ้าเรืองแสง ทำงานร่วมกับระบบโซนาร์ จึงมองเห็นได้แม้ในความมืดสนิท' },
  { id: 'markings', x: 66, y: 25, name: 'BIO-LUMINESCENT MARKINGS', desc: 'ลายเรืองแสงสีฟ้ารูปซี่โครง แสดงระดับพลังงานชีวภาพ' },
  { id: 'claws', x: 90, y: 21, name: 'ABYSSAL CLAWS', desc: 'กรงเล็บยาวราว 25 ซม. ใช้ฉีกเกราะและจับเหยื่อ' },
  { id: 'armor', x: 27, y: 36, name: 'ORGANIC ARMOR', desc: 'ผิวหนังชั้นนอกแข็งตัวเป็นเกราะชีวภาพสีกรมท่า–ดำ' },
  { id: 'mantle', x: 14, y: 76, name: 'ABYSS MANTLE', desc: 'เยื่อหนังคล้ายผ้าคลุมขาดวิ่น ช่วยลดแรงต้านเมื่อเคลื่อนที่ใต้น้ำ' },
]

export const THREAT = {
  level: 'CATASTROPHIC',
  levelTh: 'หายนะ',
  stats: [
    { label: 'STRENGTH', th: 'พละกำลัง', value: 96 },
    { label: 'DURABILITY', th: 'ความทนทาน', value: 94 },
    { label: 'SONAR', th: 'การรับรู้ด้วยเสียง', value: 100 },
    { label: 'INTELLIGENCE', th: 'สติปัญญา', value: 92 },
    { label: 'STAMINA', th: 'พลังงานต่อเนื่อง', value: 70 },
    { label: 'LAND SPEED', th: 'ความเร็วบนบก', value: 55 },
  ],
  lastSeen: 'ร่องลึกมหาสมุทรแปซิฟิก · ความลึกมากกว่า 2,000 m',
  incidents: [
    'ฐานวิจัย Project Leviathan — จมหายทั้งหมดในคืนเดียว',
    'เรือสำรวจใต้ทะเล 2 ลำ — ขาดการติดต่อ',
    'สัญญาณเสียงคลิกความถี่ผิดปกติ — ตรวจพบซ้ำทุกคืน',
  ],
  response: [
    'ห้ามเผชิญหน้าในน้ำลึก — ล่อขึ้นมาในน้ำตื้นหรือบนบก',
    'ใช้เสียงรบกวนความถี่สูงเพื่อทำให้ระบบโซนาร์สับสน',
    'ยื้อการต่อสู้จนลายเรืองแสงหรี่ลง (พลังงานหมด)',
    'โจมตีอย่างแม่นยำที่รอยต่อเกราะบริเวณลำคอและข้อต่อ',
  ],
}
