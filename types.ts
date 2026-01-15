
export enum RepairMode {
  IDLE = 'IDLE',
  SURGICAL = 'SURGICAL',
  WIPER = 'WIPER',
  TEST = 'TEST',
  SCAN = 'SCAN'
}

export type Language = 'EN' | 'PT' | 'HI' | 'RU';

export interface RepairSettings {
  duration: number;
  frequency: number;
  isActive: boolean;
  language: Language;
  extremeMode: boolean;
}

export interface GeneratedWidget {
  title: string;
  description: string;
  code: string;
  explanation: string;
}

export const TRANSLATIONS = {
  EN: {
    surgical: 'Surgical Healer',
    wiper: 'OLED Wiper',
    test: 'Screen Test',
    scan: 'Diagnostic Scan',
    warning: 'Epilepsy Warning',
    start: 'Start Treatment',
    abort: 'Abort Treatment',
    duration: 'Duration',
    extreme: 'Extreme (120Hz)',
    diagnostic_hook: 'Check Your Screen for Hidden Issues'
  },
  PT: {
    surgical: 'Curador Cirúrgico',
    wiper: 'Limpador OLED',
    test: 'Teste de Tela',
    scan: 'Varredura de Diagnóstico',
    warning: 'Aviso de Epilepsia',
    start: 'Iniciar Tratamento',
    abort: 'Abortar Tratamento',
    duration: 'Duração',
    extreme: 'Extremo (120Hz)',
    diagnostic_hook: 'Verifique sua tela para problemas ocultos'
  },
  HI: {
    surgical: 'सर्जिकल हीलर',
    wiper: 'OLED वाइपर',
    test: 'स्क्रीन टेस्ट',
    scan: 'डायग्नोस्टिक स्कैन',
    warning: 'मिर्गी की चेतावनी',
    start: 'उपचार शुरू करें',
    abort: 'उपचार बंद करें',
    duration: 'अवधि',
    extreme: 'चरम (120Hz)',
    diagnostic_hook: 'छिपी समस्याओं के लिए स्क्रीन जांचें'
  },
  RU: {
    surgical: 'Хирургическое лечение',
    wiper: 'OLED Очиститель',
    test: 'Тест экрана',
    scan: 'Диагностика',
    warning: 'Предупреждение об эпилепсии',
    start: 'Начать лечение',
    abort: 'Прервать лечение',
    duration: 'Длительность',
    extreme: 'Экстремальный (120Гц)',
    diagnostic_hook: 'Проверьте экран на наличие скрытых проблем'
  }
};
