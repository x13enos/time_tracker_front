const NOTIFICATION_SETTINGS = {
  email: {
    everyone: ['email_assign_user_to_project'],
    admin: []
  }
}

const EXTENDED_NOTIFICATION_SETTINGS = {
  email: {
    everyone: [...NOTIFICATION_SETTINGS.email.everyone, ...['email_approve_period']],
    admin: ['email_period_reports']
  },
  telegram: {
    everyone: ['telegram_assign_user_to_project', 'telegram_approve_period'],
    admin: ['telegram_daily_report']
  }
}

const LOCALES = [
  {
    title: 'English',
    flag: 'gb',
    code: 'en'
  },
  {
    title: 'Русский',
    flag: 'ru',
    code: 'ru'
  }
]

const TIMEZONES = {
  'Etc/GMT+12': 'International Date Line West - GMT-12',
  'Pacific/Pago_Pago': 'American Samoa - GMT-11',
  'Pacific/Midway': 'Midway Island - GMT-11',
  'Pacific/Honolulu': 'Hawaii - GMT-10',
  'America/Juneau': 'Alaska - GMT-9',
  'America/Los_Angeles': 'Pacific Time (US & Canada) - GMT-8',
  'America/Tijuana': 'Tijuana - GMT-8',
  'America/Phoenix': 'Arizona - GMT-7',
  'America/Chihuahua': 'Chihuahua - GMT-7',
  'America/Mazatlan': 'Mazatlan - GMT-7',
  'America/Denver': 'Mountain Time (US & Canada) - GMT-7',
  'America/Guatemala': 'Central America - GMT-6',
  'America/Chicago': 'Central Time (US & Canada) - GMT-6',
  'America/Mexico_City': 'Guadalajara - GMT-6',
  'America/Mexico_City': 'Mexico City - GMT-6',
  'America/Monterrey': 'Monterrey - GMT-6',
  'America/Regina': 'Saskatchewan - GMT-6',
  'America/Bogota': 'Bogota - GMT-5',
  'America/New_York': 'Eastern Time (US & Canada) - GMT-5',
  'America/Indiana/Indianapolis': 'Indiana (East) - GMT-5',
  'America/Lima': 'Lima - GMT-5',
  'America/Lima': 'Quito - GMT-5',
  'America/Halifax': 'Atlantic Time (Canada) - GMT-4',
  'America/Caracas': 'Caracas - GMT-4',
  'America/Guyana': 'Georgetown - GMT-4',
  'America/La_Paz': 'La Paz - GMT-4',
  'America/Puerto_Rico': 'Puerto Rico - GMT-4',
  'America/Santiago': 'Santiago - GMT-4',
  'America/St_Johns': 'Newfoundland - GMT-4',
  'America/Sao_Paulo': 'Brasilia - GMT-3',
  'America/Argentina/Buenos_Aires': 'Buenos Aires - GMT-3',
  'America/Godthab': 'Greenland - GMT-3',
  'America/Montevideo': 'Montevideo - GMT-3',
  'Atlantic/South_Georgia': 'Mid-Atlantic - GMT-2',
  'Atlantic/Azores': 'Azores - GMT-1',
  'Atlantic/Cape_Verde': 'Cape Verde Is. - GMT-1',
  'Europe/London': 'Edinburgh - GMT+0',
  'Europe/Lisbon': 'Lisbon - GMT+0',
  'Europe/London': 'London - GMT+0',
  'Africa/Monrovia': 'Monrovia - GMT+0',
  'Etc/UTC': 'UTC - GMT+0',
  'Europe/Amsterdam': 'Amsterdam - GMT+1',
  'Europe/Belgrade': 'Belgrade - GMT+1',
  'Europe/Berlin': 'Berlin - GMT+1',
  'Europe/Zurich': 'Bern - GMT+1',
  'Europe/Bratislava': 'Bratislava - GMT+1',
  'Europe/Brussels': 'Brussels - GMT+1',
  'Europe/Budapest': 'Budapest - GMT+1',
  'Africa/Casablanca': 'Casablanca - GMT+1',
  'Europe/Copenhagen': 'Copenhagen - GMT+1',
  'Europe/Dublin': 'Dublin - GMT+1',
  'Europe/Ljubljana': 'Ljubljana - GMT+1',
  'Europe/Madrid': 'Madrid - GMT+1',
  'Europe/Paris': 'Paris - GMT+1',
  'Europe/Prague': 'Prague - GMT+1',
  'Europe/Rome': 'Rome - GMT+1',
  'Europe/Sarajevo': 'Sarajevo - GMT+1',
  'Europe/Skopje': 'Skopje - GMT+1',
  'Europe/Stockholm': 'Stockholm - GMT+1',
  'Europe/Vienna': 'Vienna - GMT+1',
  'Europe/Warsaw': 'Warsaw - GMT+1',
  'Africa/Algiers': 'West Central Africa - GMT+1',
  'Europe/Zagreb': 'Zagreb - GMT+1',
  'Europe/Zurich': 'Zurich - GMT+1',
  'Europe/Athens': 'Athens - GMT+2',
  'Europe/Bucharest': 'Bucharest - GMT+2',
  'Africa/Cairo': 'Cairo - GMT+2',
  'Africa/Harare': 'Harare - GMT+2',
  'Europe/Helsinki': 'Helsinki - GMT+2',
  'Asia/Jerusalem': 'Jerusalem - GMT+2',
  'Europe/Kaliningrad': 'Kaliningrad - GMT+2',
  'Europe/Kiev': 'Kyiv - GMT+2',
  'Africa/Johannesburg': 'Pretoria - GMT+2',
  'Europe/Riga': 'Riga - GMT+2',
  'Europe/Sofia': 'Sofia - GMT+2',
  'Europe/Tallinn': 'Tallinn - GMT+2',
  'Europe/Vilnius': 'Vilnius - GMT+2',
  'Asia/Baghdad': 'Baghdad - GMT+3',
  'Europe/Istanbul': 'Istanbul - GMT+3',
  'Asia/Kuwait': 'Kuwait - GMT+3',
  'Europe/Minsk': 'Minsk - GMT+3',
  'Europe/Moscow': 'Moscow - GMT+3',
  'Africa/Nairobi': 'Nairobi - GMT+3',
  'Asia/Riyadh': 'Riyadh - GMT+3',
  'Europe/Moscow': 'St. Petersburg - GMT+3',
  'Asia/Tehran': 'Tehran - GMT+3',
  'Asia/Muscat': 'Abu Dhabi - GMT+4',
  'Asia/Baku': 'Baku - GMT+4',
  'Asia/Muscat': 'Muscat - GMT+4',
  'Europe/Samara': 'Samara - GMT+4',
  'Asia/Tbilisi': 'Tbilisi - GMT+4',
  'Europe/Volgograd': 'Volgograd - GMT+4',
  'Asia/Yerevan': 'Yerevan - GMT+4',
  'Asia/Kabul': 'Kabul - GMT+4',
  'Asia/Yekaterinburg': 'Ekaterinburg - GMT+5',
  'Asia/Karachi': 'Islamabad - GMT+5',
  'Asia/Karachi': 'Karachi - GMT+5',
  'Asia/Tashkent': 'Tashkent - GMT+5',
  'Asia/Kolkata': 'Chennai - GMT+5',
  'Asia/Kolkata': 'Kolkata - GMT+5',
  'Asia/Kolkata': 'Mumbai - GMT+5',
  'Asia/Kolkata': 'New Delhi - GMT+5',
  'Asia/Colombo': 'Sri Jayawardenepura - GMT+5',
  'Asia/Kathmandu': 'Kathmandu - GMT+5',
  'Asia/Almaty': 'Almaty - GMT+6',
  'Asia/Dhaka': 'Astana - GMT+6',
  'Asia/Dhaka': 'Dhaka - GMT+6',
  'Asia/Urumqi': 'Urumqi - GMT+6',
  'Asia/Rangoon': 'Rangoon - GMT+6',
  'Asia/Bangkok': 'Bangkok - GMT+7',
  'Asia/Bangkok': 'Hanoi - GMT+7',
  'Asia/Jakarta': 'Jakarta - GMT+7',
  'Asia/Krasnoyarsk': 'Krasnoyarsk - GMT+7',
  'Asia/Novosibirsk': 'Novosibirsk - GMT+7',
  'Asia/Shanghai': 'Beijing - GMT+8',
  'Asia/Chongqing': 'Chongqing - GMT+8',
  'Asia/Hong_Kong': 'Hong Kong - GMT+8',
  'Asia/Irkutsk': 'Irkutsk - GMT+8',
  'Asia/Kuala_Lumpur': 'Kuala Lumpur - GMT+8',
  'Australia/Perth': 'Perth - GMT+8',
  'Asia/Singapore': 'Singapore - GMT+8',
  'Asia/Taipei': 'Taipei - GMT+8',
  'Asia/Ulaanbaatar': 'Ulaanbaatar - GMT+8',
  'Asia/Tokyo': 'Osaka - GMT+9',
  'Asia/Tokyo': 'Sapporo - GMT+9',
  'Asia/Seoul': 'Seoul - GMT+9',
  'Asia/Tokyo': 'Tokyo - GMT+9',
  'Asia/Yakutsk': 'Yakutsk - GMT+9',
  'Australia/Adelaide': 'Adelaide - GMT+9',
  'Australia/Darwin': 'Darwin - GMT+9',
  'Australia/Brisbane': 'Brisbane - GMT+10',
  'Australia/Melbourne': 'Canberra - GMT+10',
  'Pacific/Guam': 'Guam - GMT+10',
  'Australia/Hobart': 'Hobart - GMT+10',
  'Australia/Melbourne': 'Melbourne - GMT+10',
  'Pacific/Port_Moresby': 'Port Moresby - GMT+10',
  'Australia/Sydney': 'Sydney - GMT+10',
  'Asia/Vladivostok': 'Vladivostok - GMT+10',
  'Asia/Magadan': 'Magadan - GMT+11',
  'Pacific/Noumea': 'New Caledonia - GMT+11',
  'Pacific/Guadalcanal': 'Solomon Is. - GMT+11',
  'Asia/Srednekolymsk': 'Srednekolymsk - GMT+11',
  'Pacific/Auckland': 'Auckland - GMT+12',
  'Pacific/Fiji': 'Fiji - GMT+12',
  'Asia/Kamchatka': 'Kamchatka - GMT+12',
  'Pacific/Majuro': 'Marshall Is. - GMT+12',
  'Pacific/Auckland': 'Wellington - GMT+12',
  'Pacific/Chatham': 'Chatham Is. - GMT+12',
  'Pacific/Tongatapu': "Nuku'alofa - GMT+13",
  'Pacific/Apia': 'Samoa - GMT+13',
  'Pacific/Fakaofo': 'Tokelau Is. - GMT+13'
}

export {
  NOTIFICATION_SETTINGS,
  EXTENDED_NOTIFICATION_SETTINGS,
  LOCALES,
  TIMEZONES
}
