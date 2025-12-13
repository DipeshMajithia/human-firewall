import { Users, AlertTriangle, ShieldCheck } from "lucide-react";

export const topicsData = {
  1: {
    title: "The Human Factor",
    description: "Why YOU are the target.",
    sections: [
      {
        type: "intro",
        title: "The Weakest Link?",
        content:
          "Cybersecurity isn't just about firewalls and encryption. 95% of cybersecurity breaches are caused by human error.",
        icon: "Users",
      },
      {
        type: "stat",
        value: "95%",
        label: "of breaches caused by human error",
        color: "text-red-500",
      },
      {
        type: "fact",
        title: "Technical Failures vs. Human Mistakes",
        content:
          "Hackers don't always break the code. They 'hack' the person. Why spend months finding a software bug when they can just ask you for your password?",
        image:
          "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTZwMmxweGdnZjhrYWFuZ3kyMzU5dHJnYmVtOXE1YTc1bHk5dWZ5ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XIahGhbK5A685fyr8D/giphy.gif", // Placeholder or humorous GIF
      },
      {
        type: "case_study",
        title: "The $100 Million Click",
        content:
          "Real breaches happen because of one wrong click. In 2013, Target was breached because a third-party vendor clicked a phishing email. Result? 40 million credit cards stolen.",
      },
      {
        type: "key_takeaway",
        title: "You are the Human Firewall",
        content:
          "You are the last line of defense. If technology fails, you can still stop the attack.",
        icon: "ShieldCheck",
      },
    ],
  },
  2: {
    title: "Phishing, Smishing & Vishing",
    description: "Don't take the bait.",
    sections: [
      {
        type: "intro",
        title: "The Art of Deception",
        content:
          "Phishing isn't just email anymore. It's SMS (Smishing), Voice calls (Vishing), and even WhatsApp.",
        icon: "AlertTriangle",
      },
      {
        type: "concept",
        title: "The 3 Emotional Triggers",
        content:
          "Hackers use Fear ('Your account is banned!'), Urgency ('Act now!'), and Reward ('You won a prize!') to make you click without thinking.",
      },
      {
        type: "game",
        title: "Game: Phish or Real?",
        gameComponent: "PhishOrReal",
        content: "Test your skills! Can you spot the fake emails?",
      },
    ],
  },
  3: {
    title: "Social Engineering",
    description: "Hacking the human mind.",
    sections: [
      {
        type: "intro",
        title: "Hacking the Mind",
        content:
          "Attackers don't always use code. Sometimes, they just use a friendly voice. Social Engineering is the art of manipulating people into giving up confidential info.",
        icon: "Users",
      },
      {
        type: "concept",
        title: "Trust & Abuse",
        content:
          "They pretend to be someone you trust: Tech Support, HR, or even a friend. They create a 'crisis' that only YOU can solve by giving them access.",
      },
      {
        type: "game",
        title: "Game: Spot the Red Flag",
        gameComponent: "SpotRedFlag",
        content: "Listen to the conversation. Can you spot the manipulation?",
      },
    ],
  },
  4: {
    title: "Passwords & Authentication",
    description: "Your keys to the kingdom.",
    sections: [
      {
        type: "intro",
        title: "Password123 is NOT a Password",
        content:
          "Weak passwords are the easiest way in. Hackers use 'Brute Force' attacks to guess millions of passwords per second.",
        icon: "Lock",
      },
      {
        type: "concept",
        title: "Size Matters",
        content:
          "Length > Complexity. A 15-character password like 'Horse-Staple-Battery-Correct' is mathematically harder to break than 'P@ssw0rd1'.",
      },
      {
        type: "game",
        title: "Game: Crack It or Secure It",
        gameComponent: "CrackIt",
        content:
          "Test your password strength against a hacker's supercomputer.",
      },
    ],
  },
  5: {
    title: "Fake Websites & QR Codes",
    description: "Read the URL or lose your data.",
    sections: [
      {
        type: "intro",
        title: "The Look-Alike Trap",
        content:
          "Hackers clone websites perfectly. The only difference is the address (URL) bar.",
        icon: "Shield",
      },
      {
        type: "concept",
        title: "Malicious QR Code (Quishing)",
        content:
          "People scan QR codes blindly. Attackers paste fake QR stickers on parking meters or menus to steal payments.",
      },
      {
        type: "game",
        title: "Game: Real Site or Trap?",
        gameComponent: "RealOrTrap",
        content: "Can you spot the fake domain in 5 seconds?",
      },
    ],
  },
  6: {
    title: "Public Wi-Fi & Hygiene",
    description: "Digital street smarts.",
    sections: [
      {
        type: "intro",
        title: "There is No Free Wi-Fi",
        content:
          "Attacks like 'Evil Twin' fake public networks. Once you connect, they steal everything you type.",
        icon: "Wifi",
      },
      {
        type: "concept",
        title: "USB Drop Attacks",
        content:
          "Curiosity kills the cat. 48% of people plug in random USB drives they find. It installs malware instantly.",
      },
      {
        type: "game",
        title: "Activity: Safe or Unsafe?",
        gameComponent: "SafeOrUnsafe",
        content: "Swipe left or right on these daily scenarios.",
      },
    ],
  },
  7: {
    title: "Malware & Ransomware",
    description: "Don't let them lock your files.",
    sections: [
      {
        type: "intro",
        title: "The Silent Invaders",
        content:
          "Malware enters via attachments, USBs, or bad links. Ransomware encrypts your files and demands payment.",
        icon: "AlertTriangle",
      },
      {
        type: "concept",
        title: "The Golden Rule",
        content:
          "If you didn't ask for it, don't download it. Verify sender identity before opening expenses, invoices, or 'urgent' docs.",
      },
      {
        type: "game",
        title: "Game: Data Defender",
        gameComponent: "DataDefender",
        content:
          "Scan incoming files. Save the safe ones, destroy the malware.",
      },
    ],
  },
  8: {
    title: "Data Privacy & GDPR",
    description: "Protecting personal information.",
    sections: [
      {
        type: "intro",
        title: "Data is the New Oil",
        content:
          "Companies must protect customer data (PII). Leaking it leads to massive fines and loss of trust.",
        icon: "ShieldCheck",
      },
      {
        type: "concept",
        title: "Classification Matters",
        content:
          "Not all data is equal. Public data can be shared. Confidential data must be encrypted. Old junk should be shredded.",
      },
      {
        type: "game",
        title: "Game: Privacy Pro",
        gameComponent: "PrivacyPro",
        content: "Classify the data correctly: Encrypt, Share, or Shred?",
      },
    ],
  },
  9: {
    title: "Physical Security",
    description: "Digital security starts with a locked door.",
    sections: [
      {
        type: "intro",
        title: "Tailgating & Piggybacking",
        content:
          "It's not football. It's when an unauthorized person follows you through a secure door. Don't be polite—be secure.",
        icon: "Shield",
      },
      {
        type: "concept",
        title: "Clean Desk Policy",
        content:
          "Passwords on sticky notes? Confidential files on your desk? That's an easy win for an insider threat or janitor.",
      },
      {
        type: "game",
        title: "Game: Access Control",
        gameComponent: "AccessGranted",
        content: "You are the security guard. Who gets in?",
      },
    ],
  },
  10: {
    title: "Incident Reporting",
    description: "See something, say something.",
    sections: [
      {
        type: "intro",
        title: "The Human Firewall is You",
        content:
          "You are the last line of defense. Security tools miss things. Human eyes don't.",
        icon: "Users",
      },
      {
        type: "concept",
        title: "Insider Threats",
        content:
          "Not all hackers wear hoodies. Some wear suits and sit next to you. Watch for unusual data hoarding or behavior.",
      },
      {
        type: "game",
        title: "Game: Insider Threat Detector",
        gameComponent: "InsiderRisk",
        content: "Spot the suspicious behavior in the office logs.",
      },
    ],
  },
};
