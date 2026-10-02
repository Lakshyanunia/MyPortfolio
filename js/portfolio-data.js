/**
 * Portfolio Data Store & Manager
 * Handles default data, localStorage persistence, import/export, and pin authentication.
 */

const STORAGE_KEY = 'portfolio_cv_data_v1';

const defaultPortfolioData = {
    adminUsername: 'lakshyanunia',
    adminPassword: 'lucky7742',
    adminPin: '1234',
    hero: {
        welcome: '👋 Welcome to my digital space',
        name: 'Lakshya Nunia',
        tagline: "I'm a passionate CSE student with Data Science and Web Development skills.",
        profileImage: 'my-profile-photo.jpeg',
        locationBadge: '📍 Based in INDIA 🇮🇳',
        cvFile: 'CV Lakshya.pdf',
        contactText: "Let's Talk"
    },
    about: {
        bio: 'I am a Computer Science undergraduate specializing in Data Science with a strong interest in software development, data analysis, and problem solving. I actively practice Data Structures and Algorithms and work on projects that enhance my technical skills in programming and data-driven technologies. I enjoy learning new technologies, building practical solutions, and continuously improving my skills to grow as a software developer and data professional. When I\'m not studying algorithms or debugging code, I\'m exploring new web technologies or contributing to open source.',
        stats: [
            { number: '2+', label: 'Years Coding' },
            { number: '5+', label: 'Projects Built' },
            { number: 'LeetCode', label: '200+ Problems Solved' }
        ],
        terminal: {
            whoami: 'CSE Student | Data Science',
            interests: '["Data Science", "Data analysis", "Competitive Programming", "AI/ML"]',
            status: 'Ready for new challenges! 🚀'
        }
    },
    education: [
        {
            id: 'edu-1',
            date: '2023 - Present',
            title: 'B.Tech in Computer Science and Engineering -(6.8 CGPA)',
            subtitle: 'Lovely Professional University',
            description: 'Specialization in Data Science. Maintaining a strong academic record while actively learning new technologies and strengthening problem-solving skills.'
        },
        {
            id: 'edu-2',
            date: '2021 - 2022',
            title: 'Class XII -(87.5 %)',
            subtitle: 'Jeevani International School',
            description: 'Completed higher secondary education with a focus on PCM.'
        },
        {
            id: 'edu-3',
            date: '2019 - 2020',
            title: 'Class X -(86 %)',
            subtitle: 'Jeevani International School',
            description: 'Completed secondary education with a focus on CBSE board.'
        }
    ],
    training: [
        {
            id: 'train-1',
            icon: '🎓',
            date: 'June 2025 - July 2025',
            title: 'DSA with Java',
            subtitle: 'CipherSchool',
            description: 'Learned fundamental data structures and algorithms using Java, focusing on problem-solving techniques and competitive programming.',
            tags: ['Java', 'DSA']
        },
        {
            id: 'train-2',
            icon: '📊',
            date: 'Jan 2026 - Feb 2026',
            title: 'DSA with C++ and Software Testing',
            subtitle: 'Lovely Professional University',
            description: 'Solved Leetcode and Learned fundamental data structures and algorithms using C++, focusing on problem-solving techniques and optimizing codes and learned alot about software testing.',
            tags: ['C++', 'DSA', 'Software Testing']
        }
    ],
    skills: [
        {
            id: 'skill-cat-1',
            title: 'Data Science',
            tags: ['MS-Excel', 'PowerBI', 'Python', 'SQL/MySQL'],
            highlights: []
        },
        {
            id: 'skill-cat-2',
            title: 'Languages',
            tags: ['Python', 'C', 'C++', 'HTML', 'CSS', 'SQL/MySQL'],
            highlights: ['★ Java']
        },
        {
            id: 'skill-cat-3',
            title: 'Tools & Others',
            tags: ['Git & GitHub', 'Tableau', 'JetBrains', 'VS Code', 'Blender', 'Unity', 'LeetCode'],
            highlights: []
        }
    ],
    projects: [
        {
            id: 'proj-1',
            type: 'Data Science',
            title: 'Covid-19 impact analysis and visualisation',
            image: 'covid_analysis.png',
            description: 'A data science project that analyzes the impact of Covid-19 on the world. It uses python, pandas, matplotlib and seaborn to analyze the impact of Covid-19 on the world.',
            tech: ['Python', 'Pandas', 'Metplotlib', 'Seaborn'],
            liveUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7317113184006426624/?originTrackingId=1NIo6%2FyJUj%2BRcLZesQExZQ%3D%3D',
            githubUrl: 'https://github.com/Lakshyanunia/Covid-19-impact-analysis-and-visualisation-'
        },
        {
            id: 'proj-2',
            type: 'Power BI',
            title: 'Traffic Crash Analysis Dashboard',
            image: 'traffic_dashboard.png',
            description: 'A dashboard that analyzes the traffic crash data which focuses on understanding crash patterns, injury severity, and risk factors to support data‑driven road safety decisions.',
            tech: ['Power BI'],
            liveUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7406067070968414208/?originTrackingId=cHg56Dsggj5GqlMoAlv2hA%3D%3D',
            githubUrl: 'https://github.com/Lakshyanunia/Traffic-Crash-Analysis-Dashboard-using-PowerBI'
        },
        {
            id: 'proj-3',
            type: 'Dashboard',
            title: 'Sales and Profit Analysis',
            image: 'sales_profit.png',
            description: 'A dashboard that analyzes the sales and profit of a company. It uses MS-Excel to analyze the sales and profit of a company.',
            tech: ['MS-Excel'],
            liveUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7317241496477306881/?originTrackingId=pM7km9kjJEhJhlObMNwNIw%3D%3D',
            githubUrl: 'https://github.com/Lakshyanunia/Sales-and-Profit-using-excel'
        }
    ],
    achievements: [
        {
            id: 'ach-1',
            badge: '🏆',
            date: '2026',
            title: 'LeetCode ranking',
            description: 'Ranking < 6.5L'
        },
        {
            id: 'ach-2',
            badge: '⭐',
            date: '2026',
            title: 'Coding Milestone in LeetCode',
            description: 'Solved 200+ problems on LeetCode with a focus on Data Structures and Algorithms, and got a 50 active days badge 2026.'
        }
    ],
    certificates: [
        {
            id: 'cert-1',
            logo: 'cipherschool.png',
            date: 'June 2025 - July 2025',
            title: 'Data Structures and Algorithms with Java',
            issuer: 'CipherSchool',
            pdfUrl: 'Lakshya_Nunia_Cipher_dsa.pdf',
            verifyUrl: 'https://www.cipherschools.com/certificate/preview?id=689f0b29ab59d1f6d4952825'
        },
        {
            id: 'cert-2',
            logo: 'cipherschool.png',
            date: 'June 2025 - July 2025',
            title: 'Git & GitHub',
            issuer: 'CipherSchool',
            pdfUrl: 'Lakshya_Nunia_Cipher_github.pdf',
            verifyUrl: 'https://www.cipherschools.com/certificate/preview?id=686398f0bb08f7190c806aaf'
        },
        {
            id: 'cert-3',
            logo: 'springboard-logo.avif',
            date: "Aug' 2025 - Sep' 2025",
            title: 'Infosys Springboard',
            issuer: 'Infosys',
            pdfUrl: 'Infosys Springboard.pdf',
            verifyUrl: 'https://infyspringboard.onwingspan.com/'
        },
        {
            id: 'cert-4',
            logo: 'boardinfinity.png',
            date: "Jan' 2024 - Feb' 2024",
            title: 'Microlearning in Data Structures & Algorithms',
            issuer: 'Board Infinity',
            pdfUrl: 'Boardinfinitymooc.pdf',
            verifyUrl: 'https://www.boardinfinity.com/lms/data-structures-and-algorithms-course-with-certification-free-recxYLAeICZ88qzpy/certificate'
        }
    ],
    contact: {
        talkHeader: "Let's talk",
        talkSubtext: "I'm currently looking for internship opportunities and exciting freelance projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
        email: 'luckylakshya@gmail.com',
        location: 'Phagwara, Punjab',
        github: 'https://github.com/Lakshyanunia',
        linkedin: 'https://www.linkedin.com/in/lakshyanunia',
        leetcode: 'https://leetcode.com/u/Lakshyanunia/',
        formspreeUrl: 'https://formspree.io/f/mvzweygw'
    }
};

/**
 * Get current portfolio data (from localStorage or default)
 */
function getPortfolioData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Deep merge defaults to ensure any new schema fields are safely fallback-loaded
            return Object.assign({}, defaultPortfolioData, parsed);
        }
    } catch (e) {
        console.warn('Failed to load portfolio data from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(defaultPortfolioData));
}

/**
 * Save data to localStorage
 */
function savePortfolioData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Failed to save portfolio data to localStorage:', e);
        return false;
    }
}

/**
 * Reset data to default
 */
function resetPortfolioData() {
    savePortfolioData(defaultPortfolioData);
    return JSON.parse(JSON.stringify(defaultPortfolioData));
}

/**
 * Download portfolio data as JSON
 */
function exportPortfolioJSON() {
    const data = getPortfolioData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Import portfolio data from JSON string
 */
function importPortfolioJSON(jsonStr) {
    try {
        const parsed = JSON.parse(jsonStr);
        if (parsed && typeof parsed === 'object') {
            savePortfolioData(parsed);
            return { success: true };
        }
    } catch (e) {
        return { success: false, error: 'Invalid JSON format' };
    }
    return { success: false, error: 'Empty or malformed data' };
}

// Attach globally for access across pages
window.PortfolioStore = {
    get: getPortfolioData,
    save: savePortfolioData,
    reset: resetPortfolioData,
    export: exportPortfolioJSON,
    import: importPortfolioJSON,
    defaults: defaultPortfolioData
};
