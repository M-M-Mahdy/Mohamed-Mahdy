/**
 * Mohamed Mahmoud Mahdy - Portfolio Interactive Logic
 * Features: Terminal Emulator, Skills Filtering, Dark/Light Mode, Certificate Lightbox, Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('mahdy-theme') || 'dark';
  setTheme(savedTheme);

  function setTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      updateThemeIcons('light');
    } else {
      root.removeAttribute('data-theme');
      updateThemeIcons('dark');
    }
    localStorage.setItem('mahdy-theme', theme);
  }

  function updateThemeIcons(theme) {
    const isLight = theme === 'light';
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    
    sunIcons.forEach(icon => {
      icon.classList.toggle('hidden', isLight);
    });
    moonIcons.forEach(icon => {
      icon.classList.toggle('hidden', !isLight);
    });
  }

  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);


  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }


  // 3. Interactive Terminal Simulator
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const termChips = document.querySelectorAll('.term-chip');

  const COMMANDS = {
    'help': `Available commands:
  • whoami          - Display profile overview
  • sysinfo         - Current architecture & environment
  • skills          - Comprehensive technical skillsets
  • certifications  - Verified accreditations & diplomas
  • experience      - Career trajectory & current role
  • uptime          - Systems reliability & SLA history
  • contact         - Direct email, phone, location
  • clear           - Clear terminal screen`,
    
    'whoami': `[IDENTITY RECORD]
Name:       Mohamed Mahmoud Mahdy
Role:       IT Infrastructure & Systems Specialist / Cloud Admin
Location:   Cairo, Egypt
Status:     🟢 Active & Open to Advanced Infrastructure / Cloud Engineering Roles
Summary:    Specialized in enterprise Windows Server/Linux environments, Cisco networking,
            VMware virtualization, perimeter firewalls (Sophos XG, pfSense), and Azure/AWS.`,
    
    'sysinfo': `[SYSTEM SPECIFICATIONS]
Host Architecture:   Enterprise Multi-Site Hybrid Infrastructure
Virtualization:      VMware ESXi Cluster & Microsoft Hyper-V
Core Services:       Active Directory DS, DNS, DHCP, GPO, File/Print Cluster
Perimeter Security:  Sophos XG Firewalls & pfSense with IPsec Site-to-Site VPN
Cloud Tenants:       Microsoft 365, Microsoft Azure, AWS Fundamentals
Backup Strategy:     Veeam Backup & Replication v12 (Instant VM Recovery)
ERP Ecosystem:       ERP NEXT, Microsoft Dynamics 365 NAV`,
    
    'skills': `[TECHNICAL SKILLS MATRIX]
• Systems:      Windows Server (2008-2022), Domain Controller, Active Directory, GPO, Linux
• Virtualize:   VMware ESXi, Hyper-V, Veeam Backup v12
• Networking:   Cisco Switches (3850/3750/3650), VLANs, Trunking, Sophos XG, pfSense VPN
• Cloud:        Azure (AZ-900, AZ-104, AZ-305), AWS Solutions & SysOps, M365, Docker
• Enterprise:   ERP NEXT, Microsoft Dynamics 365 NAV, Kaspersky Endpoint Cloud Plus
• Hardware:     Racks, Patch Panels, CCTV/IP Cameras, Grandstream & Panasonic PBX`,
    
    'certifications': `[ACCREDITATIONS & DIPLOMAS]
1. Academic Cloud Engineering Program (320 Credit Hours, Grade: Very Good) - IT Gate Academy
   → CCNA 200-301 | MCSA 2019 | Linux Admin I | Docker
   → Azure AZ-900 | Azure AZ-104 | Azure AZ-305 | AWS Solution Architect | AWS SysOps
2. VMware ESXi Virtualization Accreditation
3. Sophos XG Firewall Network Security Specialist
4. Microsoft Azure Solutions (AZ-104, AZ-305)
5. Bachelor of Information Systems (2018, Obour High Institute)`,
    
    'experience': `[PROFESSIONAL TIMELINE]
[2025 - Present]  IT System Administrator @ The United Batteries
                  → Managing Windows Server 2019/2022 DCs, VMware ESXi, Veeam v12, Cisco switches,
                    Sophos & pfSense VPN tunnels, and ERP NEXT maintenance.
[2023 - 2025]     IT System Administrator @ The Esla Ready Mode Garments Company
                  → Hyper-V cluster, Dynamics 365 NAV, Site-to-Site VPNs, PBX telephony.
[2021 - 2023]     IT Specialist @ The Egyptian Italian Company (Date Sugar)
                  → Windows Server 2016 AD, Sophos firewall, CCTV & IP security infrastructure.
[2020 - 2021]     IT Help Desk @ SERA FOR MATTRESSES AND CARPETS
                  → User access, DC troubleshooting, workstation rollouts.`,
    
    'uptime': `[RELIABILITY METRICS]
Uptime Target:       99.9% High Availability
DR Recovery Target:  RPO < 15min | RTO < 30min with Veeam Backup v12
Switch Fabric:       Cisco StackWise Redundant Topology
Security Incidents:  0 Unresolved Breaches Across Managed Perimeter Firewalls`,
    
    'contact': `[COMMUNICATION CHANNELS]
Email:     mohamed.mahmoudit5@gmail.com
Phone:     +20 103 196 0100
WhatsApp:  https://wa.me/201031960100
Location:  Cairo, Egypt
GitHub:    https://github.com/M-M-Mahdy`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const commandLine = document.createElement('div');
    commandLine.className = 'mt-2';
    commandLine.innerHTML = `<span class="terminal-prompt">admin@mahdy-srv01:~$</span> <span class="text-white">${escapeHtml(rawCmd)}</span>`;
    terminalOutput.appendChild(commandLine);

    const resultDiv = document.createElement('div');
    resultDiv.className = 'terminal-output';

    if (COMMANDS[cmd]) {
      resultDiv.innerText = COMMANDS[cmd];
    } else {
      resultDiv.innerText = `bash: command not found: ${rawCmd}. Type "help" or click one of the suggested command chips above.`;
      resultDiv.style.color = '#f87171';
    }

    terminalOutput.appendChild(resultDiv);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        executeCommand(val);
        terminalInput.value = '';
      }
    });
  }

  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (terminalInput) terminalInput.value = cmd;
      executeCommand(cmd);
      if (terminalInput) terminalInput.value = '';
    });
  });


  // 4. Skills Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.split(' ').includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });


  // 5. Certificate Modal Preview
  const certModal = document.getElementById('cert-modal');
  const openCertModalBtns = document.querySelectorAll('.open-cert-modal');
  const closeCertModalBtns = document.querySelectorAll('.close-cert-modal');

  function openModal() {
    if (certModal) {
      certModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (certModal) {
      certModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  openCertModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeCertModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && !certModal.classList.contains('hidden')) {
      closeModal();
    }
  });


  // 6. Copy Email to Clipboard
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = 'mohamed.mahmoudit5@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check text-emerald-400"></i> Copied!`;
        btn.classList.add('border-emerald-500');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('border-emerald-500');
        }, 2200);
      }).catch(err => {
        console.error('Failed to copy email:', err);
      });
    });
  });


  // 7. Contact Form Simulation
  const contactForm = document.getElementById('portfolio-contact-form');
  const formSuccessAlert = document.getElementById('form-success-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending message...`;

      setTimeout(() => {
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Message Prepared!`;
        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('hidden');
        }
        
        // Also open mailto client with prefilled details
        const name = document.getElementById('form-name')?.value || '';
        const subject = document.getElementById('form-subject')?.value || 'Infrastructure Inquiry';
        const message = document.getElementById('form-message')?.value || '';
        const mailtoUri = `mailto:mohamed.mahmoudit5@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoUri;

        contactForm.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3000);
      }, 700);
    });
  }
});
