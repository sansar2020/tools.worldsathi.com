import type { ToolMetadata } from '../types/tools';

// Comprehensive toolkit: 57 tools (52 existing + 5 new unique tools)
export const ALL_TOOLS: ToolMetadata[] = [
  // ==================== CALCULATORS (9 tools) ====================
  { 
    id: 'percentage-calculator',
    name: 'Percentage Calculator', 
    description: 'Calculate percentages, increases, and decreases instantly', 
    category: 'calculators', 
    icon: 'Percent',
    path: '/tools/calculators/percentage-calculator', 
    tags: ['math', 'percentage', 'calculator', 'finance'],
    isNew: false,
    usabilitySteps: [
      'Enter the base value in the first input field',
      'Enter the percentage or comparison value in the second field',
      'Click the "Calculate" button to see the result',
      'View the detailed breakdown of your calculation',
      'Use the Reset button to clear and start over'
    ],
    aboutContent: {
      introduction: 'The Percentage Calculator is a versatile tool designed to simplify percentage calculations for everyday use. Whether you need to calculate discounts, tax amounts, grade percentages, or financial changes, this tool provides instant and accurate results.',
      keyFeatures: [
        'Calculate percentage of any number instantly',
        'Find percentage increase or decrease between two values',
        'Determine what percentage one number is of another',
        'Reverse percentage calculations to find original values',
        'Real-time calculation as you type',
        'Clear visual display of results'
      ],
      whoBenefits: [
        'Students calculating grades and test scores',
        'Shoppers comparing discounts and sale prices',
        'Business professionals analyzing financial data',
        'Teachers grading assignments',
        'Anyone needing quick percentage calculations'
      ],
      whyChoose: [
        'Instant calculations with no waiting',
        'Multiple calculation modes in one tool',
        'No registration or installation required',
        'Works on all devices and browsers',
        'Completely free to use'
      ]
    },
    faqs: [
      { question: 'How do I calculate percentage increase?', answer: 'Enter the original value and the new value, then select the percentage increase option. The calculator will show you the percentage change.' },
      { question: 'Can I calculate discounts?', answer: 'Yes, enter the original price and discount percentage to see the final price and amount saved.' },
      { question: 'Is this tool free?', answer: 'Yes, completely free with no registration required. Use it as many times as you need.' },
      { question: 'How accurate are the calculations?', answer: 'Our calculator uses precise mathematical formulas for 100% accuracy in all percentage calculations.' },
      { question: 'Can I use this on mobile?', answer: 'Yes, the tool is fully responsive and works perfectly on smartphones, tablets, and desktop computers.' },
      { question: 'What is the formula for percentage?', answer: 'Percentage = (Part / Whole) × 100. For example, 25 out of 100 is (25/100) × 100 = 25%.' }
    ]
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and health category',
    category: 'calculators',
    icon: 'Activity',
    path: '/tools/calculators/bmi-calculator',
    tags: ['health', 'fitness', 'bmi', 'calculator', 'wellness'],
    isNew: false,
    usabilitySteps: [
      'Enter your weight in kilograms or pounds',
      'Enter your height in centimeters or feet/inches',
      'Click "Calculate" to see your BMI',
      'View your BMI category and health recommendations',
      'Use Reset to calculate for different values'
    ],
    aboutContent: {
      introduction: 'The BMI Calculator helps you determine your Body Mass Index, a widely used indicator of healthy body weight. Understanding your BMI can help you make informed decisions about your health and fitness goals.',
      keyFeatures: [
        'Calculate BMI using metric or imperial units',
        'Instant BMI category classification',
        'Health recommendations based on your BMI',
        'Support for both kg/cm and lbs/inches',
        'Color-coded BMI categories for easy understanding',
        'Educational information about BMI ranges'
      ],
      whoBenefits: [
        'Individuals monitoring their health and fitness',
        'People starting a weight loss or gain journey',
        'Healthcare professionals doing quick assessments',
        'Fitness enthusiasts tracking progress',
        'Anyone curious about their health metrics'
      ],
      whyChoose: [
        'Medically accurate BMI calculations',
        'Clear category explanations (Underweight, Normal, Overweight, Obese)',
        'Flexible unit options for global users',
        'Privacy-focused - no data stored',
        'Instant results with health guidance'
      ]
    },
    faqs: [
      { question: 'What is BMI?', answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It is calculated as weight (kg) divided by height squared (m²).' },
      { question: 'What is a healthy BMI range?', answer: 'A healthy BMI is typically between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese.' },
      { question: 'Is BMI accurate for everyone?', answer: 'BMI is a general indicator but may not be accurate for athletes, pregnant women, elderly, or children. Consult a healthcare provider for personalized assessment.' },
      { question: 'Can I use pounds and inches?', answer: 'Yes! The calculator supports both metric (kg, cm) and imperial (lbs, inches) units for your convenience.' },
      { question: 'How often should I check my BMI?', answer: 'Monthly checks are sufficient for most people. More frequent monitoring may be helpful if you are actively working on weight goals.' },
      { question: 'Does BMI account for muscle mass?', answer: 'No, BMI does not distinguish between muscle and fat. Athletes with high muscle mass may have high BMI but low body fat.' }
    ]
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tips and split bills easily',
    category: 'calculators',
    icon: 'DollarSign',
    path: '/tools/calculators/tip-calculator',
    tags: ['tip', 'calculator', 'restaurant', 'bill', 'split'],
    isNew: false,
    usabilitySteps: [
      'Enter the total bill amount',
      'Select or enter the tip percentage',
      'Enter the number of people to split the bill',
      'View the tip amount and total per person',
      'Use preset tip percentages for quick calculations'
    ],
    aboutContent: {
      introduction: 'The Tip Calculator makes dining out stress-free by instantly calculating tips and splitting bills among multiple people. Perfect for restaurants, cafes, and any service where tipping is customary.',
      keyFeatures: [
        'Calculate tips with any percentage',
        'Preset tip options (15%, 18%, 20%, 25%)',
        'Split bills among multiple people',
        'See total amount including tip',
        'Calculate per-person cost automatically',
        'Round up options for convenience'
      ],
      whoBenefits: [
        'Diners wanting to tip appropriately',
        'Groups splitting restaurant bills',
        'People unfamiliar with local tipping customs',
        'Anyone wanting quick and accurate calculations',
        'Service industry workers checking their tips'
      ],
      whyChoose: [
        'Instant calculations with preset percentages',
        'Easy bill splitting for groups',
        'No math errors or awkward moments',
        'Works for any currency',
        'Simple and intuitive interface'
      ]
    },
    faqs: [
      { question: 'What is a standard tip percentage?', answer: 'In the US, 15-20% is standard for good service. 18% is common, while 20-25% is for excellent service.' },
      { question: 'How do I split a bill evenly?', answer: 'Enter the total bill, select your tip percentage, and enter the number of people. The calculator shows the amount each person pays.' },
      { question: 'Can I use this for other currencies?', answer: 'Yes! The calculator works with any currency. Just enter the amount and it will calculate the tip and split accordingly.' },
      { question: 'Should I tip on the pre-tax or post-tax amount?', answer: 'This varies by region. In the US, it is common to tip on the pre-tax amount, but many people tip on the total including tax.' },
      { question: 'What if I want to tip a custom percentage?', answer: 'You can enter any custom percentage you like. The calculator is not limited to the preset options.' },
      { question: 'How do I handle uneven splits?', answer: 'This calculator splits evenly. For uneven splits, calculate each person\'s portion separately based on what they ordered.' }
    ]
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and total interest on loans',
    category: 'calculators',
    icon: 'Calculator',
    path: '/tools/calculators/loan-calculator',
    tags: ['loan', 'calculator', 'finance', 'mortgage', 'interest'],
    isNew: false,
    usabilitySteps: [
      'Enter the loan amount (principal)',
      'Enter the annual interest rate',
      'Enter the loan term in years',
      'Click Calculate to see monthly payment',
      'View total payment and total interest breakdown'
    ],
    aboutContent: {
      introduction: 'The Loan Calculator helps you understand the true cost of borrowing by calculating monthly payments, total interest, and total amount paid over the life of a loan. Essential for making informed financial decisions.',
      keyFeatures: [
        'Calculate monthly loan payments',
        'See total interest paid over loan term',
        'View total amount paid (principal + interest)',
        'Support for any loan amount and term',
        'Accurate amortization calculations',
        'Clear breakdown of payment components'
      ],
      whoBenefits: [
        'Home buyers planning mortgage payments',
        'Car buyers comparing auto loans',
        'Students evaluating education loans',
        'Business owners considering business loans',
        'Anyone comparing loan offers'
      ],
      whyChoose: [
        'Accurate amortization formula',
        'Clear display of all payment components',
        'Helps compare different loan scenarios',
        'Understand true cost of borrowing',
        'Make informed financial decisions'
      ]
    },
    faqs: [
      { question: 'How is monthly payment calculated?', answer: 'Monthly payment uses the amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is principal, r is monthly interest rate, and n is number of payments.' },
      { question: 'What is the difference between principal and interest?', answer: 'Principal is the original loan amount you borrow. Interest is the cost of borrowing that money, paid to the lender.' },
      { question: 'Can I use this for mortgages?', answer: 'Yes! This calculator works for mortgages, auto loans, personal loans, and any fixed-rate loan with regular payments.' },
      { question: 'What is amortization?', answer: 'Amortization is the process of paying off a loan through regular payments. Early payments are mostly interest; later payments are mostly principal.' },
      { question: 'How can I reduce total interest paid?', answer: 'Make extra principal payments, choose a shorter loan term, or negotiate a lower interest rate to reduce total interest.' },
      { question: 'Does this include taxes and insurance?', answer: 'No, this calculator shows only principal and interest. For mortgages, add property taxes, insurance, and HOA fees separately.' }
    ]
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest and investment growth',
    category: 'calculators',
    icon: 'TrendingUp',
    path: '/tools/calculators/compound-interest-calculator',
    tags: ['compound', 'interest', 'investment', 'savings', 'finance'],
    isNew: false,
    usabilitySteps: [
      'Enter your initial investment amount',
      'Enter the annual interest rate',
      'Enter the investment time period in years',
      'Select compounding frequency (monthly, quarterly, annually)',
      'View final amount and interest earned'
    ]
  },
  {
    id: 'calorie-calculator',
    name: 'Calorie Calculator',
    description: 'Calculate daily calorie needs based on your activity level',
    category: 'calculators',
    icon: 'Apple',
    path: '/tools/calculators/calorie-calculator',
    tags: ['calorie', 'nutrition', 'health', 'fitness', 'diet'],
    isNew: false,
    usabilitySteps: [
      'Enter your age, gender, weight, and height',
      'Select your activity level',
      'View your daily calorie needs',
      'See recommendations for weight loss, maintenance, and gain'
    ]
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, and days',
    category: 'calculators',
    icon: 'Calendar',
    path: '/tools/calculators/age-calculator',
    tags: ['age', 'date', 'calculator', 'birthday'],
    isNew: false,
    usabilitySteps: [
      'Enter your birth date',
      'View your exact age in years, months, and days',
      'See days until your next birthday'
    ]
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate differences between dates or add/subtract days',
    category: 'calculators',
    icon: 'CalendarDays',
    path: '/tools/calculators/date-calculator',
    tags: ['date', 'calculator', 'time', 'days'],
    isNew: false,
    usabilitySteps: [
      'Choose calculation mode (difference or add/subtract)',
      'Enter your dates',
      'View the result in days, weeks, months, and years'
    ]
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate final prices and savings after applying discounts',
    category: 'calculators',
    icon: 'Percent',
    path: '/tools/calculators/discount-calculator',
    tags: ['discount', 'calculator', 'savings', 'price', 'percentage', 'shopping'],
    isNew: false,
    usabilitySteps: [
      'Enter the original price of the item',
      'Enter the discount percentage',
      'View the discount amount and final price instantly',
      'See your total savings clearly displayed'
    ],
    aboutContent: {
      introduction: 'The Discount Calculator helps shoppers and businesses quickly calculate final prices after applying percentage discounts. Perfect for comparing deals, planning purchases, and understanding your savings on sale items.',
      keyFeatures: [
        'Instant calculation of discount amounts',
        'Real-time updates as you type',
        'Clear display of final price after discount',
        'Shows total savings amount',
        'Input validation for accurate results',
        'Detailed breakdown of calculations'
      ],
      whoBenefits: [
        'Shoppers comparing sale prices and deals',
        'Retailers calculating promotional pricing',
        'Business owners planning discount strategies',
        'Budget-conscious consumers tracking savings',
        'Anyone wanting to understand discount math'
      ],
      whyChoose: [
        'Simple and intuitive interface',
        'Instant calculations with no delays',
        'Works with any currency',
        'Mobile-friendly for shopping on the go',
        'Completely free with no ads'
      ]
    },
    faqs: [
      { question: 'How is the discount calculated?', answer: 'Discount Amount = Original Price × (Discount Percentage ÷ 100). Final Price = Original Price - Discount Amount.' },
      { question: 'Can I calculate multiple discounts?', answer: 'This calculator handles single discounts. For multiple discounts, apply them sequentially: calculate the first discount, then use the result as the original price for the second discount.' },
      { question: 'Does this include tax?', answer: 'No, this calculator shows pre-tax prices. Add applicable sales tax to the final price separately.' },
      { question: 'What if the discount is more than 100%?', answer: 'The calculator validates that discounts are between 0% and 100%. Discounts over 100% are not mathematically valid.' },
      { question: 'Can I use this for any currency?', answer: 'Yes! The calculator works with any currency. Just enter the amount and it will calculate the discount accordingly.' },
      { question: 'How do I calculate the original price from a discounted price?', answer: 'If you know the final price and discount percentage, use: Original Price = Final Price ÷ (1 - Discount Percentage ÷ 100).' }
    ]
  },

  // ==================== CONVERTERS (7 tools) ====================
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    category: 'converters',
    icon: 'Ruler',
    path: '/tools/converters/unit-converter',
    tags: ['unit', 'converter', 'measurement', 'length'],
    isNew: false,
    usabilitySteps: [
      'Enter the value to convert',
      'Select the unit to convert from',
      'Select the unit to convert to',
      'View the converted result instantly'
    ]
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies with real-time rates',
    category: 'converters',
    icon: 'DollarSign',
    path: '/tools/converters/currency-converter',
    tags: ['currency', 'converter', 'money', 'exchange'],
    isNew: false,
    usabilitySteps: [
      'Enter the amount to convert',
      'Select the currency to convert from',
      'Select the currency to convert to',
      'View the converted amount with exchange rate'
    ]
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    category: 'converters',
    icon: 'Thermometer',
    path: '/tools/converters/temperature-converter',
    tags: ['temperature', 'converter', 'celsius', 'fahrenheit', 'kelvin'],
    isNew: false,
    usabilitySteps: [
      'Enter the temperature value',
      'Select the scale to convert from',
      'Select the scale to convert to',
      'View the converted temperature with formula'
    ]
  },
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert time between different time zones',
    category: 'converters',
    icon: 'Clock',
    path: '/tools/converters/timezone-converter',
    tags: ['timezone', 'time', 'converter', 'world'],
    isNew: false,
    usabilitySteps: [
      'Select source time zone',
      'Enter the time to convert',
      'Select target time zone',
      'View the converted time'
    ]
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'Convert between different weight units',
    category: 'converters',
    icon: 'Weight',
    path: '/tools/converters/weight-converter',
    tags: ['weight', 'converter', 'mass', 'measurement'],
    isNew: false,
    usabilitySteps: [
      'Enter the weight value',
      'Select the unit to convert from',
      'Select the unit to convert to',
      'View the converted weight'
    ]
  },
  {
    id: 'area-converter',
    name: 'Area Converter',
    description: 'Convert between different area units',
    category: 'converters',
    icon: 'Square',
    path: '/tools/converters/area-converter',
    tags: ['area', 'converter', 'measurement', 'square'],
    isNew: false,
    usabilitySteps: [
      'Enter the area value',
      'Select the unit to convert from',
      'Select the unit to convert to',
      'View the converted area'
    ]
  },
  {
    id: 'speed-converter',
    name: 'Speed Converter',
    description: 'Convert between different speed units',
    category: 'converters',
    icon: 'Gauge',
    path: '/tools/converters/speed-converter',
    tags: ['speed', 'converter', 'velocity', 'measurement'],
    isNew: false,
    usabilitySteps: [
      'Enter the speed value',
      'Select the unit to convert from',
      'Select the unit to convert to',
      'View the converted speed'
    ]
  },

  // ==================== GENERATORS (8 tools) ====================
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords',
    category: 'generators',
    icon: 'Key',
    path: '/tools/generators/password-generator',
    tags: ['password', 'generator', 'security', 'random'],
    isNew: false,
    usabilitySteps: [
      'Set password length',
      'Choose character types (uppercase, lowercase, numbers, symbols)',
      'Click Generate to create password',
      'Copy password to clipboard',
      'Generate multiple passwords as needed'
    ]
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create QR codes for URLs, text, and more',
    category: 'generators',
    icon: 'QrCode',
    path: '/tools/generators/qr-code-generator',
    tags: ['qr', 'code', 'generator', 'barcode'],
    isNew: false,
    usabilitySteps: [
      'Enter text or URL',
      'Customize QR code size and color',
      'Generate QR code',
      'Download as PNG image',
      'Use in your projects'
    ]
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs',
    category: 'generators',
    icon: 'FileText',
    path: '/tools/generators/lorem-ipsum-generator',
    tags: ['lorem', 'ipsum', 'text', 'placeholder', 'generator'],
    isNew: false,
    usabilitySteps: [
      'Choose generation mode (paragraphs, words, or characters)',
      'Enter the desired quantity',
      'Click Generate to create text',
      'Copy to clipboard',
      'Use in your designs'
    ]
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (UUIDs)',
    category: 'generators',
    icon: 'Hash',
    path: '/tools/generators/uuid-generator',
    tags: ['uuid', 'guid', 'generator', 'unique', 'identifier'],
    isNew: false,
    usabilitySteps: [
      'Click Generate to create UUID',
      'Copy individual UUIDs',
      'Generate multiple UUIDs at once',
      'Use in your applications'
    ]
  },
  {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    description: 'Generate beautiful color palettes',
    category: 'generators',
    icon: 'Palette',
    path: '/tools/generators/color-palette-generator',
    tags: ['color', 'palette', 'generator', 'design'],
    isNew: false,
    usabilitySteps: [
      'Click Generate to create random palette',
      'View 5 harmonious colors',
      'Copy hex codes',
      'Generate new palettes',
      'Use in your designs'
    ]
  },
  {
    id: 'barcode-generator',
    name: 'Barcode Generator',
    description: 'Generate barcodes in various formats',
    category: 'generators',
    icon: 'Barcode',
    path: '/tools/generators/barcode-generator',
    tags: ['barcode', 'generator', 'code128', 'ean'],
    isNew: false,
    usabilitySteps: [
      'Enter barcode data',
      'Select barcode format',
      'Generate barcode',
      'Download as image'
    ]
  },
  {
    id: 'username-generator',
    name: 'Username Generator',
    description: 'Generate creative usernames',
    category: 'generators',
    icon: 'User',
    path: '/tools/generators/username-generator',
    tags: ['username', 'generator', 'random', 'creative'],
    isNew: false,
    usabilitySteps: [
      'Choose username style',
      'Set preferences',
      'Generate username',
      'Copy to use'
    ]
  },
  {
    id: 'markdown-table-generator',
    name: 'Markdown Table Generator',
    description: 'Create Markdown tables with visual spreadsheet interface',
    category: 'generators',
    icon: 'Table',
    path: '/tools/generators/markdown-table-generator',
    tags: ['markdown', 'table', 'generator', 'spreadsheet', 'formatting'],
    isNew: true,
    usabilitySteps: [
      'Add or remove rows and columns using the buttons',
      'Click cells to edit content directly',
      'Set column alignment (left, center, right) using header buttons',
      'Import data from CSV file for quick table creation',
      'Copy generated Markdown syntax or export as CSV'
    ],
    aboutContent: {
      introduction: 'The Markdown Table Generator provides a visual spreadsheet-like interface for creating perfectly formatted Markdown tables. No need to manually align pipes and dashes - just edit cells like a spreadsheet and get clean Markdown syntax instantly.',
      keyFeatures: [
        'Visual spreadsheet interface for easy editing',
        'Add/remove rows and columns with one click',
        'Set column alignment (left, center, right)',
        'Import existing data from CSV files',
        'Export to Markdown or CSV format',
        'Live preview of table structure',
        'Copy to clipboard with one click',
        'Supports unlimited rows and columns'
      ],
      whoBenefits: [
        'Developers writing README files and documentation',
        'Technical writers creating Markdown content',
        'Bloggers using Markdown-based platforms',
        'GitHub users documenting projects',
        'Content creators working with static site generators',
        'Anyone who needs clean, formatted tables in Markdown'
      ],
      whyChoose: [
        'No manual pipe and dash alignment needed',
        'Visual editing is faster than text editing',
        'Import CSV data to save time',
        'Perfect Markdown syntax every time',
        'Works offline in your browser',
        'Free with no registration required'
      ]
    },
    faqs: [
      { question: 'What is Markdown table syntax?', answer: 'Markdown tables use pipes (|) to separate columns and dashes (-) to create headers. Example: | Header | Header |\n|--------|--------|\n| Cell   | Cell   |' },
      { question: 'How do I align columns?', answer: 'Click the alignment button in the column header to cycle through left, center, and right alignment. The Markdown syntax will update automatically with colons (:).' },
      { question: 'Can I import existing data?', answer: 'Yes! Click "Import CSV" to upload a CSV file. The tool will automatically convert it to a Markdown table.' },
      { question: 'What is the maximum table size?', answer: 'There is no hard limit, but very large tables (100+ rows) may slow down the interface. For best performance, keep tables under 50 rows.' },
      { question: 'Can I export back to CSV?', answer: 'Yes! After creating your table, you can export it as CSV format for use in spreadsheet applications.' },
      { question: 'Does this work with GitHub?', answer: 'Absolutely! The generated Markdown is fully compatible with GitHub, GitLab, and other platforms that support Markdown tables.' }
    ]
  },

  // ==================== ANALYZERS (5 tools) ====================
  {
    id: 'text-analyzer',
    name: 'Text Analyzer',
    description: 'Analyze text for word count, character count, and reading time',
    category: 'analyzers',
    icon: 'FileText',
    path: '/tools/analyzers/text-analyzer',
    tags: ['text', 'analyzer', 'word count', 'character count'],
    isNew: false,
    usabilitySteps: [
      'Paste or type your text',
      'View real-time statistics',
      'See word count, character count, and reading time',
      'Analyze sentence and paragraph structure'
    ]
  },
  {
    id: 'readability-analyzer',
    name: 'Readability Analyzer',
    description: 'Analyze text readability and grade level',
    category: 'analyzers',
    icon: 'BookOpen',
    path: '/tools/analyzers/readability-analyzer',
    tags: ['readability', 'analyzer', 'flesch', 'grade'],
    isNew: false,
    usabilitySteps: [
      'Paste your text',
      'View readability scores',
      'See grade level',
      'Get improvement suggestions'
    ]
  },
  {
    id: 'color-palette-extractor',
    name: 'Color Palette Extractor',
    description: 'Extract dominant colors from images',
    category: 'analyzers',
    icon: 'Palette',
    path: '/tools/analyzers/color-palette-extractor',
    tags: ['color', 'palette', 'extractor', 'image'],
    isNew: false,
    usabilitySteps: [
      'Upload an image',
      'View extracted color palette',
      'Copy hex codes',
      'Export as CSS or JSON'
    ]
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    description: 'Analyze keyword frequency in text',
    category: 'analyzers',
    icon: 'Search',
    path: '/tools/analyzers/keyword-density',
    tags: ['keyword', 'density', 'seo', 'analyzer'],
    isNew: false,
    usabilitySteps: [
      'Paste your text',
      'View keyword frequency',
      'See density percentages',
      'Optimize for SEO'
    ]
  },
  {
    id: 'color-accessibility-checker',
    name: 'Color Accessibility Checker',
    description: 'Check color contrast for WCAG compliance and accessibility',
    category: 'analyzers',
    icon: 'Eye',
    path: '/tools/analyzers/color-accessibility-checker',
    tags: ['color', 'accessibility', 'wcag', 'contrast', 'a11y'],
    isNew: true,
    usabilitySteps: [
      'Select foreground color using color picker or enter hex code',
      'Select background color using color picker or enter hex code',
      'View calculated contrast ratio instantly',
      'Check WCAG AA and AAA compliance for normal and large text',
      'See suggested color alternatives for better accessibility'
    ],
    aboutContent: {
      introduction: 'The Color Accessibility Checker helps designers and developers ensure their color combinations meet WCAG (Web Content Accessibility Guidelines) standards. Create inclusive designs that are readable for everyone, including users with visual impairments.',
      keyFeatures: [
        'Calculate contrast ratio between any two colors',
        'Check WCAG AA and AAA compliance levels',
        'Separate ratings for normal text and large text',
        'Visual preview of text on background',
        'Suggest improved color alternatives',
        'Support for hex, RGB, and color picker input',
        'Real-time contrast calculation',
        'Educational information about WCAG standards'
      ],
      whoBenefits: [
        'Web designers ensuring accessible color schemes',
        'UI/UX designers creating inclusive interfaces',
        'Developers implementing WCAG compliance',
        'Content creators choosing readable colors',
        'Accessibility specialists auditing designs',
        'Anyone committed to inclusive design'
      ],
      whyChoose: [
        'Instant WCAG compliance checking',
        'Clear pass/fail indicators for all levels',
        'Visual preview helps you see the difference',
        'Suggests alternatives when colors fail',
        'Based on official WCAG 2.1 guidelines',
        'Free and easy to use'
      ]
    },
    faqs: [
      { question: 'What is WCAG?', answer: 'WCAG (Web Content Accessibility Guidelines) are international standards for making web content accessible to people with disabilities, including visual impairments.' },
      { question: 'What is a good contrast ratio?', answer: 'WCAG AA requires 4.5:1 for normal text and 3:1 for large text. WCAG AAA requires 7:1 for normal text and 4.5:1 for large text.' },
      { question: 'What is considered large text?', answer: 'Large text is defined as 18pt (24px) or larger, or 14pt (18.66px) or larger if bold.' },
      { question: 'Why does accessibility matter?', answer: 'About 1 in 12 men and 1 in 200 women have some form of color blindness. Good contrast ensures your content is readable for everyone.' },
      { question: 'Can I check multiple color combinations?', answer: 'Yes! Simply change the foreground or background color and the tool will instantly recalculate the contrast ratio.' },
      { question: 'What if my colors fail the test?', answer: 'The tool suggests alternative colors that meet WCAG standards while staying close to your original choices.' }
    ]
  },

  // ==================== TEXT TOOLS (5 tools) ====================
  {
    id: 'character-counter',
    name: 'Character Counter',
    description: 'Count characters, words, and sentences',
    category: 'text-tools',
    icon: 'Type',
    path: '/tools/text-tools/character-counter',
    tags: ['character', 'counter', 'word', 'text'],
    isNew: false,
    usabilitySteps: [
      'Paste or type your text',
      'View character count',
      'See word and sentence count',
      'Copy statistics'
    ]
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between different cases',
    category: 'text-tools',
    icon: 'Type',
    path: '/tools/text-tools/case-converter',
    tags: ['case', 'converter', 'uppercase', 'lowercase'],
    isNew: false,
    usabilitySteps: [
      'Paste your text',
      'Choose case style',
      'View converted text',
      'Copy result'
    ]
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    description: 'Reverse text or words',
    category: 'text-tools',
    icon: 'ArrowLeftRight',
    path: '/tools/text-tools/text-reverser',
    tags: ['text', 'reverser', 'reverse', 'flip'],
    isNew: false,
    usabilitySteps: [
      'Enter text to reverse',
      'Choose reverse mode',
      'View reversed text',
      'Copy result'
    ]
  },
  {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    description: 'Remove duplicate lines from text',
    category: 'text-tools',
    icon: 'Copy',
    path: '/tools/text-tools/remove-duplicate-lines',
    tags: ['duplicate', 'lines', 'remove', 'text'],
    isNew: false,
    usabilitySteps: [
      'Paste text with duplicates',
      'Toggle case sensitivity',
      'View cleaned text',
      'Copy result'
    ]
  },
  {
    id: 'text-diff-checker',
    name: 'Text Diff Checker',
    description: 'Compare two texts and highlight differences',
    category: 'text-tools',
    icon: 'GitCompare',
    path: '/tools/text-tools/text-diff-checker',
    tags: ['diff', 'compare', 'text', 'difference'],
    isNew: false,
    usabilitySteps: [
      'Paste first text',
      'Paste second text',
      'View differences',
      'See additions and deletions'
    ]
  },

  // ==================== IMAGE TOOLS (3 tools) ====================
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to specific dimensions',
    category: 'image-tools',
    icon: 'Maximize',
    path: '/tools/image-tools/image-resizer',
    tags: ['image', 'resize', 'dimensions', 'scale'],
    isNew: false,
    usabilitySteps: [
      'Upload an image',
      'Enter new dimensions',
      'Preview resized image',
      'Download result'
    ]
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images to reduce file size',
    category: 'image-tools',
    icon: 'Minimize',
    path: '/tools/image-tools/image-compressor',
    tags: ['image', 'compress', 'optimize', 'size'],
    isNew: false,
    usabilitySteps: [
      'Upload an image',
      'Adjust compression quality',
      'Preview compressed image',
      'Download optimized file'
    ]
  },
  {
    id: 'image-format-converter',
    name: 'Image Format Converter',
    description: 'Convert images between formats',
    category: 'image-tools',
    icon: 'Image',
    path: '/tools/image-tools/image-format-converter',
    tags: ['image', 'format', 'converter', 'jpg', 'png'],
    isNew: false,
    usabilitySteps: [
      'Upload an image',
      'Select output format',
      'Convert image',
      'Download converted file'
    ]
  },
  {
    id: 'image-metadata-stripper',
    name: 'Image Metadata Stripper',
    description: 'Remove EXIF and metadata from images for privacy',
    category: 'image-tools',
    icon: 'ShieldCheck',
    path: '/tools/image-tools/image-metadata-stripper',
    tags: ['image', 'metadata', 'exif', 'privacy', 'security'],
    isNew: true,
    usabilitySteps: [
      'Upload an image file (JPG, PNG, WebP)',
      'View extracted metadata including camera model, GPS location, and date',
      'Review before/after metadata comparison',
      'Click "Remove Metadata" to strip all EXIF data',
      'Download the cleaned image with privacy protected'
    ],
    aboutContent: {
      introduction: 'The Image Metadata Stripper is a privacy-focused tool that removes hidden EXIF data from your photos. Protect your privacy by removing location data, camera information, and other metadata before sharing images online.',
      keyFeatures: [
        'Extract and display all EXIF metadata',
        'Show GPS coordinates if present in image',
        'Display camera model, software, and date information',
        'Remove all metadata with one click',
        'Before/after metadata comparison',
        'Support for JPG, PNG, and WebP formats',
        'Client-side processing - images never leave your browser',
        'Download cleaned images instantly'
      ],
      whoBenefits: [
        'Privacy-conscious individuals sharing photos online',
        'Photographers protecting location information',
        'Social media users concerned about data leakage',
        'Journalists and activists protecting sources',
        'Real estate agents removing property location data',
        'Anyone wanting to control their digital footprint'
      ],
      whyChoose: [
        'Complete privacy - all processing happens in your browser',
        'No image uploads to external servers',
        'See exactly what metadata is being removed',
        'Fast and easy to use',
        'Supports all common image formats',
        'Free with no registration required'
      ]
    },
    faqs: [
      { question: 'What is EXIF metadata?', answer: 'EXIF (Exchangeable Image File Format) is metadata embedded in images by cameras and phones. It can include GPS location, camera model, date/time, and software information.' },
      { question: 'Why should I remove metadata?', answer: 'Metadata can reveal your location, the device you used, and when the photo was taken. Removing it protects your privacy when sharing images online.' },
      { question: 'Does this work offline?', answer: 'Yes! All processing happens in your browser. Your images are never uploaded to any server, ensuring complete privacy.' },
      { question: 'What metadata is removed?', answer: 'All EXIF data is removed, including GPS coordinates, camera make/model, date/time, software, orientation, and any custom tags.' },
      { question: 'Will image quality be affected?', answer: 'No! Only the metadata is removed. The actual image pixels remain unchanged, so there is no quality loss.' },
      { question: 'Can I remove metadata from multiple images?', answer: 'Currently, the tool processes one image at a time. For batch processing, process each image individually.' }
    ]
  },

  // ==================== DATA TOOLS (4 tools) ====================
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    category: 'data-tools',
    icon: 'Braces',
    path: '/tools/data-tools/json-formatter',
    tags: ['json', 'formatter', 'validator', 'data'],
    isNew: false,
    usabilitySteps: [
      'Paste JSON data',
      'Format or minify',
      'Validate syntax',
      'Copy formatted result'
    ]
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    description: 'Convert CSV data to JSON format',
    category: 'data-tools',
    icon: 'FileJson',
    path: '/tools/data-tools/csv-to-json',
    tags: ['csv', 'json', 'converter', 'data'],
    isNew: false,
    usabilitySteps: [
      'Paste CSV data',
      'Configure options',
      'Convert to JSON',
      'Copy or download result'
    ]
  },
  {
    id: 'base64-tool',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 data',
    category: 'data-tools',
    icon: 'Binary',
    path: '/tools/data-tools/base64-tool',
    tags: ['base64', 'encoder', 'decoder', 'data'],
    isNew: false,
    usabilitySteps: [
      'Enter text or Base64',
      'Choose encode or decode',
      'View result',
      'Copy output'
    ]
  },
  {
    id: 'csv-pivot-table-generator',
    name: 'CSV Pivot Table Generator',
    description: 'Create interactive pivot tables from CSV data with aggregation',
    category: 'data-tools',
    icon: 'Table2',
    path: '/tools/data-tools/csv-pivot-table-generator',
    tags: ['csv', 'pivot', 'table', 'data', 'analysis', 'aggregation'],
    isNew: true,
    usabilitySteps: [
      'Upload a CSV file or paste CSV data',
      'Select row dimension (field to group by rows)',
      'Select column dimension (field to group by columns)',
      'Choose value field and aggregation function (sum, average, count, min, max)',
      'View interactive pivot table with drill-down capabilities',
      'Export results to CSV or JSON format'
    ],
    aboutContent: {
      introduction: 'The CSV Pivot Table Generator transforms raw CSV data into insightful pivot tables with powerful aggregation capabilities. Analyze trends, summarize data, and discover patterns without complex spreadsheet software.',
      keyFeatures: [
        'Upload CSV files or paste data directly',
        'Select any field as row or column dimension',
        'Multiple aggregation functions (sum, average, count, min, max)',
        'Interactive sortable table headers',
        'Drill-down capabilities for detailed analysis',
        'Export pivot results to CSV or JSON',
        'Automatic data type detection',
        'Handle large datasets efficiently'
      ],
      whoBenefits: [
        'Data analysts summarizing large datasets',
        'Business professionals creating reports',
        'Researchers analyzing survey results',
        'Sales teams tracking performance metrics',
        'Marketers analyzing campaign data',
        'Anyone needing quick data insights'
      ],
      whyChoose: [
        'No Excel or spreadsheet software required',
        'Works entirely in your browser',
        'Fast processing of large CSV files',
        'Intuitive interface for non-technical users',
        'Multiple export formats',
        'Free with no data limits'
      ]
    },
    faqs: [
      { question: 'What is a pivot table?', answer: 'A pivot table is a data summarization tool that automatically sorts, counts, and totals data stored in a table format. It helps you analyze patterns and trends by reorganizing and aggregating data.' },
      { question: 'What aggregation functions are available?', answer: 'The tool supports Sum (total values), Average (mean), Count (number of records), Min (smallest value), and Max (largest value).' },
      { question: 'Can I use this with large CSV files?', answer: 'Yes! The tool efficiently handles files with thousands of rows. For very large files (100,000+ rows), processing may take a few seconds.' },
      { question: 'What CSV format is required?', answer: 'Standard CSV format with comma-separated values. The first row should contain column headers.' },
      { question: 'Can I drill down into the data?', answer: 'Yes! Click on any cell in the pivot table to see the underlying records that make up that aggregated value.' },
      { question: 'How do I export the results?', answer: 'After generating your pivot table, use the Export buttons to download as CSV (for spreadsheets) or JSON (for programming).' }
    ]
  },

  // ==================== SEO TOOLS (3 tools) ====================
  {
    id: 'meta-tags-generator',
    name: 'Meta Tags Generator',
    description: 'Generate SEO meta tags',
    category: 'seo-tools',
    icon: 'Tags',
    path: '/tools/seo-tools/meta-tags-generator',
    tags: ['meta', 'tags', 'seo', 'generator'],
    isNew: false,
    usabilitySteps: [
      'Enter page details',
      'Generate meta tags',
      'Copy HTML code',
      'Add to your website'
    ]
  },
  {
    id: 'og-preview',
    name: 'Open Graph Preview',
    description: 'Preview Open Graph social media cards',
    category: 'seo-tools',
    icon: 'Share2',
    path: '/tools/seo-tools/og-preview',
    tags: ['open graph', 'og', 'preview', 'social'],
    isNew: false,
    usabilitySteps: [
      'Enter OG tags',
      'Preview card',
      'See how it looks on social media',
      'Adjust and optimize'
    ]
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    description: 'Check keyword density for SEO',
    category: 'seo-tools',
    icon: 'Search',
    path: '/tools/seo-tools/keyword-density',
    tags: ['keyword', 'density', 'seo', 'checker'],
    isNew: false,
    usabilitySteps: [
      'Paste your content',
      'View keyword frequency',
      'Check density percentages',
      'Optimize for SEO'
    ]
  },

  // ==================== DEVELOPER TOOLS (7 tools) ====================
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions',
    category: 'developer-tools',
    icon: 'Code',
    path: '/tools/developer-tools/regex-tester',
    tags: ['regex', 'tester', 'regular expression', 'developer'],
    isNew: false,
    usabilitySteps: [
      'Enter regex pattern',
      'Enter test string',
      'View matches',
      'Debug and refine'
    ]
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256 hashes',
    category: 'developer-tools',
    icon: 'Hash',
    path: '/tools/developer-tools/hash-generator',
    tags: ['hash', 'md5', 'sha', 'generator'],
    isNew: false,
    usabilitySteps: [
      'Enter text to hash',
      'Select hash algorithm',
      'Generate hash',
      'Copy result'
    ]
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs',
    category: 'developer-tools',
    icon: 'Link',
    path: '/tools/developer-tools/url-encoder',
    tags: ['url', 'encoder', 'decoder', 'developer'],
    isNew: false,
    usabilitySteps: [
      'Enter URL',
      'Choose encode or decode',
      'View result',
      'Copy encoded/decoded URL'
    ]
  },
  {
    id: 'json-to-typescript',
    name: 'JSON to TypeScript',
    description: 'Convert JSON to TypeScript interfaces',
    category: 'developer-tools',
    icon: 'FileCode',
    path: '/tools/developer-tools/json-to-typescript',
    tags: ['json', 'typescript', 'converter', 'interface'],
    isNew: false,
    usabilitySteps: [
      'Paste JSON',
      'Generate TypeScript',
      'Copy interfaces',
      'Use in your code'
    ]
  },
  {
    id: 'color-code-converter',
    name: 'Color Code Converter',
    description: 'Convert between color formats',
    category: 'developer-tools',
    icon: 'Palette',
    path: '/tools/developer-tools/color-code-converter',
    tags: ['color', 'converter', 'hex', 'rgb'],
    isNew: false,
    usabilitySteps: [
      'Enter color code',
      'View all formats',
      'Copy desired format',
      'Use in your code'
    ]
  },
  {
    id: 'uuid-validator',
    name: 'UUID Validator',
    description: 'Validate and analyze UUIDs',
    category: 'developer-tools',
    icon: 'CheckCircle',
    path: '/tools/developer-tools/uuid-validator',
    tags: ['uuid', 'validator', 'guid', 'developer'],
    isNew: false,
    usabilitySteps: [
      'Enter UUID',
      'Validate format',
      'View UUID details',
      'Check version'
    ]
  },
  {
    id: 'binary-file-hex-viewer',
    name: 'Binary File Hex Viewer',
    description: 'View binary files in hexadecimal format with ASCII representation',
    category: 'developer-tools',
    icon: 'Binary',
    path: '/tools/developer-tools/binary-file-hex-viewer',
    tags: ['binary', 'hex', 'viewer', 'file', 'developer', 'hexadecimal'],
    isNew: true,
    usabilitySteps: [
      'Upload any binary file (executables, images, documents, etc.)',
      'View content in hexadecimal format with offset addresses',
      'See ASCII representation side-by-side with hex values',
      'Search for specific hex patterns or byte sequences',
      'Adjust byte grouping (1, 2, 4, or 8 bytes per group)',
      'Select character encoding for ASCII display'
    ],
    aboutContent: {
      introduction: 'The Binary File Hex Viewer allows developers and security researchers to inspect binary files at the byte level. View any file in hexadecimal format with ASCII representation, search for patterns, and analyze file structure without specialized software.',
      keyFeatures: [
        'Upload and view any binary file type',
        'Hexadecimal display with offset addresses',
        'Side-by-side ASCII representation',
        'Search for hex patterns and byte sequences',
        'Adjustable byte grouping (1/2/4/8 bytes)',
        'Multiple character encoding options',
        'Highlight byte ranges for analysis',
        'Zebra striping for better readability',
        'Copy hex values or ASCII text'
      ],
      whoBenefits: [
        'Software developers debugging binary formats',
        'Security researchers analyzing malware',
        'Reverse engineers examining executables',
        'Data recovery specialists inspecting corrupted files',
        'Network engineers analyzing packet captures',
        'Anyone needing low-level file inspection'
      ],
      whyChoose: [
        'No installation required - works in browser',
        'Supports files of any type and size',
        'Clean, readable hex dump format',
        'Fast search and navigation',
        'Multiple viewing options',
        'Free and privacy-focused'
      ]
    },
    faqs: [
      { question: 'What is hexadecimal format?', answer: 'Hexadecimal (hex) is a base-16 number system using digits 0-9 and letters A-F. Each byte (8 bits) is represented by two hex digits, making it easier to read binary data.' },
      { question: 'What is the ASCII column?', answer: 'The ASCII column shows the character representation of each byte. Printable characters (letters, numbers, symbols) are displayed; non-printable bytes show as dots (.).' },
      { question: 'Can I view large files?', answer: 'Yes, but very large files (>10MB) may take time to load. The viewer displays files in chunks for better performance.' },
      { question: 'What are offset addresses?', answer: 'Offset addresses (shown on the left) indicate the position of each byte in the file, starting from 0. They help you locate specific bytes.' },
      { question: 'How do I search for patterns?', answer: 'Use the search box to enter hex values (e.g., "48 65 6C 6C 6F" for "Hello"). The viewer will highlight all matches in the file.' },
      { question: 'What file types are supported?', answer: 'All file types! The viewer works with executables, images, documents, archives, and any other binary or text file.' }
    ]
  },

  // ==================== PRODUCTIVITY (1 tool) ====================
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: 'Focus timer using the Pomodoro Technique',
    category: 'productivity',
    icon: 'Timer',
    path: '/tools/productivity/pomodoro-timer',
    tags: ['pomodoro', 'timer', 'productivity', 'focus'],
    isNew: false,
    usabilitySteps: [
      'Set work duration',
      'Set break duration',
      'Start timer',
      'Focus on your task',
      'Take breaks when prompted'
    ]
  },

  // ==================== FINANCE TOOLS (1 tool) ====================
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage payments and costs',
    category: 'finance-tools',
    icon: 'Home',
    path: '/tools/finance-tools/mortgage-calculator',
    tags: ['mortgage', 'calculator', 'finance', 'home'],
    isNew: false,
    usabilitySteps: [
      'Enter home price',
      'Enter down payment',
      'Set interest rate and term',
      'Add taxes and insurance',
      'View monthly payment breakdown'
    ]
  },
];

// Helper function to get tool by ID
export function getToolById(id: string): ToolMetadata | undefined {
  return ALL_TOOLS.find(tool => tool.id === id);
}

// Helper function to get tools by category
export function getToolsByCategory(category: string): ToolMetadata[] {
  return ALL_TOOLS.filter(tool => tool.category === category);
}

// Helper function to search tools
export function searchTools(query: string): ToolMetadata[] {
  const lowerQuery = query.toLowerCase();
  return ALL_TOOLS.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
