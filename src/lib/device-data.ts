export const deviceBrands = [
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'oppo', name: 'Oppo' },
  { id: 'vivo', name: 'Vivo' },
  { id: 'redmi', name: 'Redmi' },
  { id: 'realme', name: 'Realme' },
  { id: 'tecno', name: 'Tecno' },
  { id: 'iqoo', name: 'iQOO' },
  { id: 'oneplus', name: 'OnePlus' },
  { id: 'google_pixel', name: 'Google Pixel' },
  { id: 'other', name: 'Other' },
];

export const deviceModels: { [key: string]: { id: string; name: string }[] } = {
  apple: [
    { id: 'iphone_15_pro_max', name: 'iPhone 15 Pro Max' },
    { id: 'iphone_15_pro', name: 'iPhone 15 Pro' },
    { id: 'iphone_15_plus', name: 'iPhone 15 Plus' },
    { id: 'iphone_15', name: 'iPhone 15' },
    { id: 'iphone_14_pro_max', name: 'iPhone 14 Pro Max' },
    { id: 'iphone_14_pro', name: 'iPhone 14 Pro' },
    { id: 'iphone_14_plus', name: 'iPhone 14 Plus' },
    { id: 'iphone_14', name: 'iPhone 14' },
    { id: 'iphone_13', name: 'iPhone 13' },
    { id: 'iphone_12', name: 'iPhone 12' },
    { id: 'iphone_11', name: 'iPhone 11' },
    { id: 'iphone_se', name: 'iPhone SE' },
  ],
  samsung: [
    { id: 'galaxy_s24_ultra', name: 'Galaxy S24 Ultra' },
    { id: 'galaxy_s24_plus', name: 'Galaxy S24+' },
    { id: 'galaxy_s24', name: 'Galaxy S24' },
    { id: 'galaxy_z_fold5', name: 'Galaxy Z Fold5' },
    { id: 'galaxy_z_flip5', name: 'Galaxy Z Flip5' },
    { id: 'galaxy_a55', name: 'Galaxy A55' },
  ],
  oppo: [
      { id: 'reno_11_pro', name: 'Reno 11 Pro' },
      { id: 'find_n3_flip', name: 'Find N3 Flip' },
      { id: 'a79', name: 'A79' },
  ],
  vivo: [
      { id: 'v30_pro', name: 'V30 Pro' },
      { id: 'x100_pro', name: 'X100 Pro' },
      { id: 't2_pro', name: 'T2 Pro' },
  ],
  redmi: [
      { id: 'note_13_pro_plus', name: 'Note 13 Pro+' },
      { id: '13c', name: '13C' },
      { id: 'note_12_pro', name: 'Note 12 Pro' },
  ],
  realme: [
      { id: '12_pro_plus', name: '12 Pro+' },
      { id: 'narzo_70_pro', name: 'Narzo 70 Pro' },
      { id: 'c67', name: 'C67' },
  ],
  tecno: [
      { id: 'pova_6_pro', name: 'Pova 6 Pro' },
      { id: 'spark_20c', name: 'Spark 20C' },
      { id: 'phantom_v_fold', name: 'Phantom V Fold' },
  ],
  iqoo: [
      { id: 'neo_9_pro', name: 'Neo 9 Pro' },
      { id: 'z9', name: 'Z9' },
      { id: '12', name: '12' },
  ],
  oneplus: [
    { id: 'oneplus_12', name: 'OnePlus 12' },
    { id: 'oneplus_11', name: 'OnePlus 11' },
    { id: 'oneplus_nord_ce4', name: 'OnePlus Nord CE 4' },
  ],
  google_pixel: [
      { id: 'pixel_8_pro', name: 'Pixel 8 Pro' },
      { id: 'pixel_8', name: 'Pixel 8' },
      { id: 'pixel_7a', name: 'Pixel 7a' },
  ],
  other: [],
};
