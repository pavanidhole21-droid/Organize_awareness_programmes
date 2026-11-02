/**
 * JAGRUK — Community Awareness & Action Network
 * Main Application Logic & State Engine
 * Version 1.0 (CEP Prototype)
 */

// ==========================================
// 1. I18N DICTIONARY (EN, MR, HI)
// ==========================================
const translations = {
  en: {
    nav_home: "Home",
    nav_panindia: "Pan-India Hub",
    nav_explore: "Explore Activities",
    nav_needs: "Need Board",
    nav_report: "Report a Need",
    nav_organizer: "Organizer Desk",
    nav_moderator: "Moderator Console",
    nav_impact: "Impact Ledger",
    hero_desc: "JAGRUK connects community needs with local student groups, volunteers, and NGOs. Report issues, convert needs into campaigns, participate safely, and inspect verified impact records.",
    cta_report: "Report a Community Need",
    cta_join: "Volunteer for an Activity",
    cta_ledger: "View Verified Impact",
    cta_upload_photo: "Upload Action Photo",
    kpi_camps: "Completed Campaigns",
    kpi_citizens: "Citizens Reached",
    kpi_volunteers: "Active Volunteers",
    kpi_waste: "Waste Safely Removed",
    brand_tagline: "Don't Just Spread Awareness. Create Action."
  },
  mr: {
    nav_home: "मुख्यपृष्ठ",
    nav_panindia: "अखिल भारतीय दालन",
    nav_explore: "उपक्रम शोधा",
    nav_needs: "समस्या फलक",
    nav_report: "समस्या नोंदवा",
    nav_organizer: "आयोजक कक्ष",
    nav_moderator: "समीक्षक कक्ष",
    nav_impact: "प्रभाव नोंदवही",
    hero_desc: "जागरूक हे स्थानिक समस्यांना विद्यार्थी, स्वयंसेवक आणि संस्थांशी जोडते. समस्या नोंदवा, मोहीम राबवा, सुरक्षित सहभाग घ्या आणि पडताळलेला प्रभाव पहा.",
    cta_report: "समस्या नोंदवा",
    cta_join: "स्वयंसेवक व्हा",
    cta_ledger: "पडताळलेला प्रभाव पहा",
    cta_upload_photo: "कृती फोटो अपलोड करा",
    kpi_camps: "पूर्ण झालेल्या मोहिमा",
    kpi_citizens: "नागरिकांपर्यंत पोहोच",
    kpi_volunteers: "सक्रिय स्वयंसेवक",
    kpi_waste: "कचरा निर्मूलन",
    brand_tagline: "केवळ जनजागृती नको, प्रत्यक्ष कृती करा."
  },
  hi: {
    nav_home: "होम",
    nav_panindia: "अखिल भारतीय अभियान",
    nav_explore: "गतिविधियां देखें",
    nav_needs: "समस्या बोर्ड",
    nav_report: "समस्या दर्ज करें",
    nav_organizer: "आयोजक डेस्क",
    nav_moderator: "समीक्षक कंसोल",
    nav_impact: "प्रभाव बहीखाता",
    hero_desc: "जागरूक स्थानीय समस्याओं को छात्रों, स्वयंसेवकों और संस्थाओं से जोड़ता है। समस्या दर्ज करें, अभियान शुरू करें, सुरक्षित भाग लें और सत्यापित प्रभाव देखें।",
    cta_report: "समस्या दर्ज करें",
    cta_join: "स्वयंसेवक बनें",
    cta_ledger: "सत्यापित प्रभाव देखें",
    cta_upload_photo: "अभियान फोटो अपलोड करें",
    kpi_camps: "सफल अभियान",
    kpi_citizens: "नागरिक लाभान्वित",
    kpi_volunteers: "सक्रिय स्वयंसेवक",
    kpi_waste: "कचरा हटाया गया",
    brand_tagline: "सिर्फ जागरूकता नहीं, सीधे समाधान।"
  }
};

// ==========================================
// 2. INITIAL SEED DATA (CEP PILOT)
// ==========================================
const DEFAULT_STATE = {
  currentLanguage: 'en',
  currentPersona: 'resident',
  currentTheme: 'light',
  reports: [
    {
      id: 'rep-1',
      title: 'Plastic waste & debris dump near Dighori bus shelter',
      category: 'Cleanliness',
      description: 'Single-use plastic bottles, wrappers and dry waste accumulating along the pedestrian walkway for 3 weeks.',
      area: 'Dighori Square, near Bus Stand',
      author: 'Sunita G.',
      photoUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
      status: 'accepted',
      upvotes: 24,
      moderatorNote: 'Verified civic location. Suitable for student volunteer cleanup drive.',
      createdAt: '2026-10-10 10:30'
    },
    {
      id: 'rep-2',
      title: 'Streetlight pole #4 out of order, dark intersection hazard',
      category: 'Safety',
      description: 'The primary light at the bend has been non-functional, creating safety risks for evening commuters and students.',
      area: 'Telephone Nagar Chowk',
      author: 'Prajwal F.',
      photoUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
      status: 'converted_to_campaign',
      upvotes: 38,
      moderatorNote: 'Converted to Evening Safety & Solar Lamp Drive.',
      createdAt: '2026-10-12 18:45'
    },
    {
      id: 'rep-3',
      title: 'Stagnant rainwater pool with mosquito breeding',
      category: 'Health',
      description: 'Open drainage puddle on the road shoulder after rain. Potential vector-borne disease risk for surrounding houses.',
      area: 'Vihirgaon Gram, near ZP School',
      author: 'Ramesh K.',
      photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?auto=format&fit=crop&w=600&q=80',
      status: 'under_review',
      upvotes: 11,
      moderatorNote: null,
      createdAt: '2026-10-16 09:15'
    },
    {
      id: 'rep-4',
      title: 'Broken benches and neglected flowerbeds in community ground',
      category: 'Environment',
      description: 'Park fence broken and shrubs drying up. Senior citizens and children need a safe clean green park space.',
      area: 'Gajanan Nagar Garden',
      author: 'Anil M.',
      photoUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=600&q=80',
      status: 'resolved',
      upvotes: 19,
      moderatorNote: 'Completed through CEP Gajanan Tree & Revamp Drive.',
      createdAt: '2026-10-01 14:00'
    },
    {
      id: 'rep-5',
      title: 'Waste burning on vacant plot behind grocery shop',
      category: 'Cleanliness',
      description: 'Leaves and plastic sacks were burned in the evening creating toxic smoke in neighborhood.',
      area: 'Umrer Road, Lane 3',
      author: 'Priti M.',
      photoUrl: '',
      status: 'duplicate',
      upvotes: 4,
      moderatorNote: 'Duplicate of municipal complaint #883.',
      createdAt: '2026-10-08 16:20'
    }
  ],
  campaigns: [
    {
      id: 'camp-1',
      sourceReportId: 'rep-1',
      title: 'Dighori Square Plastic Cleanliness & Segregation Drive',
      category: 'Cleanliness',
      state: 'Maharashtra',
      city: 'Nagpur',
      area: 'Dighori Square & Bus Shelter',
      dateTime: '2026-10-25T08:30',
      capacity: 25,
      goal: 'Collect unsegregated dry plastic, clear the pedestrian footpath, and educate local shopkeepers on dry/wet bins.',
      safetyNotes: 'Heavy-duty gloves and bags provided. Closed shoes required.',
      organizer: 'Prajwal Fating (CEP Student Lead)',
      status: 'published',
      registeredCount: 19
    },
    {
      id: 'camp-2',
      sourceReportId: 'rep-2',
      title: 'Telephone Nagar Dark Spot Vigil & Solar Marker Drive',
      category: 'Safety',
      state: 'Maharashtra',
      city: 'Nagpur',
      area: 'Telephone Nagar Chowk',
      dateTime: '2026-10-24T18:00',
      capacity: 15,
      goal: 'Install temporary reflective warning markers and coordinate safety walk with local ward coordinator.',
      safetyNotes: 'High-visibility safety vests will be provided to all volunteers.',
      organizer: 'Tejas Ingole (SCET Student Coordinator)',
      status: 'full',
      registeredCount: 15
    },
    {
      id: 'camp-3',
      sourceReportId: 'rep-3',
      title: 'Vihirgaon Gram Sanitation & Anti-Mosquito Awareness Walk',
      category: 'Health',
      state: 'Maharashtra',
      city: 'Nagpur',
      area: 'Vihirgaon Grampanchayat',
      dateTime: '2026-10-28T09:00',
      capacity: 30,
      goal: 'Distribute sanitation pamphlets, treat stagnant water puddles with bio-larvicide, and speak to 60 households.',
      safetyNotes: 'Wear sun protection hats; drinking water station available.',
      organizer: 'Palak Urkude (Health Outreach)',
      status: 'published',
      registeredCount: 22
    },
    {
      id: 'camp-4',
      sourceReportId: 'rep-4',
      title: 'Gajanan Nagar Tree Plantation & Public Garden Revamp',
      category: 'Environment',
      state: 'Maharashtra',
      city: 'Nagpur',
      area: 'Gajanan Nagar Community Garden',
      dateTime: '2026-10-05T08:00',
      capacity: 20,
      goal: 'Plant 45 indigenous shade trees, fix park benches, and establish rainwater percolation pits.',
      safetyNotes: 'Garden spades, water hoses, and first aid kit on-site.',
      organizer: 'Srushti Ninawe (Green Campus Club)',
      status: 'completed',
      registeredCount: 20
    },
    {
      id: 'camp-5',
      sourceReportId: null,
      title: 'Assam Heritage Tea Plantation & Organic Soil Care Campaign',
      category: 'Tea Plantation',
      state: 'Assam',
      city: 'Jorhat / Dibrugarh',
      area: 'Upper Assam Brahmaputra Foothills',
      dateTime: '2026-10-30T07:30',
      capacity: 50,
      goal: 'Plant 2,500 organic Assam broadleaf tea saplings, establish natural shade-tree cover, and train youth on bio-mulching.',
      safetyNotes: 'Sun protection hats and planting trowels provided. Local tea garden mentors on-site.',
      organizer: 'Debojit Saikia (Assam Agro-Forestry Forum)',
      status: 'published',
      registeredCount: 38
    },
    {
      id: 'camp-6',
      sourceReportId: null,
      title: 'Munnar Western Ghats Tea Garden Shade & Eco-Camp',
      category: 'Tea Plantation',
      state: 'Kerala',
      city: 'Munnar',
      area: 'Kannan Devan Hills Eco-Zone',
      dateTime: '2026-11-04T08:00',
      capacity: 35,
      goal: 'Slope stabilization with native tea shrubs and intercropping cardamoms; eco-camping awareness session.',
      safetyNotes: 'Raincoats and trekking gloves provided; high-traction trekking shoes recommended.',
      organizer: 'Dr. Lakshmi Nair (Western Ghats Care Collective)',
      status: 'published',
      registeredCount: 24
    },
    {
      id: 'camp-7',
      sourceReportId: null,
      title: 'Darjeeling Himalayan Organic Tea Terracing & Erosion Defense',
      category: 'Tea Plantation',
      state: 'West Bengal',
      city: 'Darjeeling',
      area: 'Happy Valley Slope Region',
      dateTime: '2026-11-10T09:00',
      capacity: 30,
      goal: 'Plant 1,200 slow-growth clonal tea saplings along vulnerable runoff trenches to prevent monsoon soil wash.',
      safetyNotes: 'Warm layers and garden gloves recommended. Warm mountain tea provided.',
      organizer: 'Tenzing Sherpa (Himalayan Green Guild)',
      status: 'published',
      registeredCount: 21
    },
    {
      id: 'camp-8',
      sourceReportId: null,
      title: 'Nagpur Ambazari Catchment Native Tree Plantation',
      category: 'Environment',
      state: 'Maharashtra',
      city: 'Nagpur',
      area: 'Ambazari Lake Catchment Zone',
      dateTime: '2026-10-27T07:00',
      capacity: 60,
      goal: 'Plant 200 indigenous peepal, banyan, and jamun saplings to create an urban micro-forest and bird sanctuary.',
      safetyNotes: 'Spades, tree collars, and hydration packs provided by Forestry Dept.',
      organizer: 'Prof. Arpit Topre & SCET Green Cell',
      status: 'published',
      registeredCount: 47
    },
    {
      id: 'camp-9',
      sourceReportId: null,
      title: 'Bengaluru Bellandur Buffer Cleanliness & Miyawaki Afforestation',
      category: 'Cleanliness',
      state: 'Karnataka',
      city: 'Bengaluru',
      area: 'Bellandur Eco-Buffer Zone',
      dateTime: '2026-11-02T08:30',
      capacity: 40,
      goal: 'Clean wetland plastics, test dissolved oxygen, and plant 150 riparian saplings along lake boundary.',
      safetyNotes: 'Safety waders, boots, and lab test kits on spot.',
      organizer: 'Kavya Raman (Bangalore Eco-Action Trust)',
      status: 'published',
      registeredCount: 32
    },
    {
      id: 'camp-10',
      sourceReportId: null,
      title: 'Rishikesh Clean Ganga Riverbank & Eco-Camping Vigil',
      category: 'Cleanliness',
      state: 'Uttarakhand',
      city: 'Rishikesh',
      area: 'Triveni Ghat to Lakshman Jhula',
      dateTime: '2026-11-12T06:30',
      capacity: 45,
      goal: 'Riverbank cleanup drive, zero-plastic camping pledge, and water testing with community youth.',
      safetyNotes: 'Eco-friendly cloth collection sacks supplied. First-aid kit available.',
      organizer: 'Swami Anand & Himalayan Youth Club',
      status: 'published',
      registeredCount: 29
    }
  ],
  registrations: [
    {
      ticketCode: 'JAG-7104-VOL',
      campaignId: 'camp-1',
      fullName: 'Rahul Sharma',
      mobile: '9876543210',
      locality: 'Dighori Square',
      role: 'volunteer',
      status: 'attended',
      registeredAt: '2026-10-18 11:20'
    },
    {
      ticketCode: 'JAG-8942-VOL',
      campaignId: 'camp-1',
      fullName: 'Pooja Deshmukh',
      mobile: '9822334455',
      locality: 'SCET College, CSE Dept',
      role: 'volunteer',
      status: 'registered',
      registeredAt: '2026-10-19 09:40'
    },
    {
      ticketCode: 'JAG-5531-VOL',
      campaignId: 'camp-4',
      fullName: 'Amit Verma',
      mobile: '9765432109',
      locality: 'Vihirgaon',
      role: 'volunteer',
      status: 'attended',
      registeredAt: '2026-10-03 14:10'
    }
  ],
  impactReports: [
    {
      id: 'imp-1',
      campaignId: 'camp-4',
      campaignTitle: 'Gajanan Nagar Tree Plantation & Public Garden Revamp',
      category: 'Environment',
      submittedBy: 'Srushti Ninawe',
      participantsCount: 20,
      metricName: 'Native Trees Planted & Guarded',
      metricBefore: 0,
      metricAfter: 45,
      summary: 'Volunteers and local residents planted 45 native neem, peepal and karanj saplings with protective metal tree guards. 5 student caretakers assigned.',
      evidenceUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      reviewStatus: 'approved',
      reviewedBy: 'Prof. Arpit Topre (Faculty Guide)',
      reviewedAt: '2026-10-06 17:00'
    },
    {
      id: 'imp-2',
      campaignId: 'camp-past',
      campaignTitle: 'Telephone Nagar Square Cleanliness & Waste Drive',
      category: 'Cleanliness',
      submittedBy: 'Prajwal Fating',
      participantsCount: 42,
      metricName: 'Kg Plastic Waste Removed',
      metricBefore: 540,
      metricAfter: 0,
      summary: 'Cleared three major square corners. 540kg of segregated plastics and roadside debris packed into 35 municipal bags and handed over to local ward tractor.',
      evidenceUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      reviewStatus: 'approved',
      reviewedBy: 'Admin Topre',
      reviewedAt: '2026-08-01 12:00'
    },
    {
      id: 'imp-3',
      campaignId: 'camp-past-2',
      campaignTitle: 'SCET Umrer Road Bus Shelter Dark Spot & Solar Illumination Drive',
      category: 'Safety',
      submittedBy: 'Prajwal Fating (Student Volunteer Head)',
      participantsCount: 18,
      metricName: 'Hazardous Dark Spots Resolved',
      metricBefore: 6,
      metricAfter: 0,
      summary: 'Eliminated 6 dark spots along the college bus shelter stretch with dual-beam solar LED fixtures and reflective safety road markers.',
      evidenceUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      reviewStatus: 'approved',
      reviewedBy: 'Prof. Arpit Topre (Faculty Guide)',
      reviewedAt: '2026-09-15 18:30'
    },
    {
      id: 'imp-4',
      campaignId: 'camp-past-3',
      campaignTitle: 'Dighori Pedestrian Walkway Debris & Silt Removal',
      category: 'Cleanliness',
      submittedBy: 'Sunita G. (Community Coordinator)',
      participantsCount: 26,
      metricName: 'Kg Silt & Construction Debris Cleared',
      metricBefore: 380,
      metricAfter: 0,
      summary: 'Cleared 380 kg of accumulated silt and broken pavers obstructing the pedestrian footpath. Restored barrier-free walking access for 200+ daily commuters.',
      evidenceUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      reviewStatus: 'approved',
      reviewedBy: 'Admin Topre',
      reviewedAt: '2026-09-28 16:45'
    }
  ],
  auditLogs: [
    {
      timestamp: '2026-10-18 10:15',
      actor: 'Admin / Moderator',
      action: 'APPROVE_REPORT',
      entity: 'Report #rep-1',
      reason: 'Verified non-emergency community need; public location confirmed'
    },
    {
      timestamp: '2026-10-18 11:30',
      actor: 'Organizer (Prajwal F.)',
      action: 'CONVERT_TO_CAMPAIGN',
      entity: 'Campaign #camp-1',
      reason: 'Awareness-to-Action linked to report #rep-1'
    },
    {
      timestamp: '2026-10-06 17:00',
      actor: 'Moderator (Prof. Topre)',
      action: 'VERIFY_IMPACT_REPORT',
      entity: 'Impact #imp-1',
      reason: 'Photo evidence and attendee roster verified'
    }
  ],
  feedback: [
    {
      campaignId: 'camp-4',
      rating: 5,
      awareness: 'Yes',
      comments: 'Very well organized! The tree guards will protect saplings from stray cattle.'
    },
    {
      campaignId: 'camp-4',
      rating: 5,
      awareness: 'Yes',
      comments: 'Great bonding with students and colony elders.'
    }
  ],
  campaignPhotos: [
    {
      id: 'photo-1',
      campaignId: 'camp-5',
      campaignTitle: 'Assam Heritage Tea Plantation & Organic Soil Care Campaign',
      category: 'Tea Plantation',
      state: 'Assam',
      city: 'Jorhat',
      volunteerName: 'Debojit Saikia & Youth Team',
      photoUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      caption: 'Planted 150 high-yield organic Assam tea saplings this morning! Incredible energy from local college volunteers and tea garden workers.',
      metric: '150 tea saplings planted',
      cheers: 42,
      verified: true,
      uploadedAt: '2026-10-21 11:30'
    },
    {
      id: 'photo-2',
      campaignId: 'camp-6',
      campaignTitle: 'Munnar Western Ghats Tea Garden Shade & Eco-Camp',
      category: 'Tea Plantation',
      state: 'Kerala',
      city: 'Munnar',
      volunteerName: 'Ananya & Vishnu (Eco-Campers)',
      photoUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
      caption: 'Camping in the mist and planting native shade-trees alongside organic tea terracing in Munnar hills.',
      metric: '85 tea terraces reinforced',
      cheers: 56,
      verified: true,
      uploadedAt: '2026-10-20 16:45'
    },
    {
      id: 'photo-3',
      campaignId: 'camp-4',
      campaignTitle: 'Gajanan Nagar Tree Plantation & Public Garden Revamp',
      category: 'Environment',
      state: 'Maharashtra',
      city: 'Nagpur',
      volunteerName: 'Srushti Ninawe (CEP Volunteer)',
      photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      caption: 'Planting neem and karanj trees in Gajanan Nagar, Nagpur. Each sapling has its own metal tree guard!',
      metric: '45 native trees protected',
      cheers: 38,
      verified: true,
      uploadedAt: '2026-10-18 10:15'
    },
    {
      id: 'photo-4',
      campaignId: 'camp-7',
      campaignTitle: 'Darjeeling Himalayan Organic Tea Terracing & Erosion Defense',
      category: 'Tea Plantation',
      state: 'West Bengal',
      city: 'Darjeeling',
      volunteerName: 'Tenzing & Darjeeling Youth Guild',
      photoUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      caption: 'Reinforcing terraced hillsides with tea bushes to stop soil erosion after monsoon. Beautiful misty Himalayan morning!',
      metric: '90 clonal tea bushes planted',
      cheers: 61,
      verified: true,
      uploadedAt: '2026-10-19 14:20'
    },
    {
      id: 'photo-5',
      campaignId: 'camp-1',
      campaignTitle: 'Dighori Square Plastic Cleanliness & Segregation Drive',
      category: 'Cleanliness',
      state: 'Maharashtra',
      city: 'Nagpur',
      volunteerName: 'Prajwal Fating & SCET Engineers',
      photoUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      caption: 'All-hands cleanup at Dighori Square, Nagpur. Handed over 35 segregated plastic bags for recycling.',
      metric: '540 kg waste segregated',
      cheers: 29,
      verified: true,
      uploadedAt: '2026-10-17 09:50'
    }
  ]
};

// ==========================================
// 3. PERSISTENCE & STATE ENGINE
// ==========================================
let state = loadState();

function loadState() {
  let loaded = null;
  const saved = localStorage.getItem('JAGRUK_STATE_V1');
  if (saved) {
    try {
      loaded = JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing saved state, using default', e);
    }
  }
  if (!loaded) {
    loaded = JSON.parse(JSON.stringify(DEFAULT_STATE));
  } else {
    // Migration: Ensure Pan-India campaigns and photos exist
    if (!loaded.campaignPhotos || loaded.campaignPhotos.length === 0) {
      loaded.campaignPhotos = JSON.parse(JSON.stringify(DEFAULT_STATE.campaignPhotos));
    }
    // Ensure all seed campaigns exist
    DEFAULT_STATE.campaigns.forEach(defaultCamp => {
      if (!loaded.campaigns.some(c => c.id === defaultCamp.id)) {
        loaded.campaigns.push(defaultCamp);
      }
    });
    // Ensure all seed impact reports exist
    if (!loaded.impactReports) loaded.impactReports = [];
    DEFAULT_STATE.impactReports.forEach(defaultImp => {
      if (!loaded.impactReports.some(i => i.id === defaultImp.id)) {
        loaded.impactReports.push(defaultImp);
      }
    });
    // Ensure campaigns have state and city
    loaded.campaigns.forEach(c => {
      if (!c.state) c.state = 'Maharashtra';
      if (!c.city) c.city = 'Nagpur';
    });
  }
  return loaded;
}

function saveState() {
  localStorage.setItem('JAGRUK_STATE_V1', JSON.stringify(state));
}

function resetDemoData() {
  if (confirm('Reset JAGRUK demo data to original sample state?')) {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    saveState();
    showToast('Demo data successfully reset! 🔄');
    renderAllViews();
    switchView('home');
  }
}

// ==========================================
// 4. NAVIGATION & VIEW SWITCHING
// ==========================================
function switchView(viewName) {
  // Hide all sections
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.nav-link-btn').forEach(btn => btn.classList.remove('active'));

  // Show target
  const targetSec = document.getElementById(`view-${viewName}`);
  const targetNav = document.getElementById(`nav-${viewName}`);

  if (targetSec) targetSec.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Refresh view specific components
  if (viewName === 'home') renderHome();
  if (viewName === 'panindia') renderPanIndia();
  if (viewName === 'explore') renderExplore();
  if (viewName === 'needs') renderNeedsBoard();
  if (viewName === 'organizer') renderOrganizer();
  if (viewName === 'moderator') renderModerator();
  if (viewName === 'impact') renderImpact();
}

// ==========================================
// 5. I18N & PERSONA HANDLERS
// ==========================================
function changeLanguage(lang) {
  state.currentLanguage = lang;
  saveState();

  const dict = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const tagline = document.getElementById('brandTagline');
  if (tagline && dict.brand_tagline) {
    tagline.textContent = dict.brand_tagline;
  }

  showToast(`Language changed to ${lang.toUpperCase()}`);
}

function changePersona(persona) {
  state.currentPersona = persona;
  saveState();

  const iconMap = {
    resident: '👤',
    volunteer: '🤝',
    organizer: '📋',
    moderator: '🛡️'
  };

  const pIcon = document.getElementById('personaIcon');
  if (pIcon) pIcon.textContent = iconMap[persona] || '👤';

  showToast(`Active persona switched to: ${persona.toUpperCase()}`);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  state.currentTheme = next;
  saveState();

  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}

// ==========================================
// 6. RENDER VIEWS
// ==========================================

// RENDER HOME VIEW
function renderHome() {
  // Update stats
  const completedCamps = state.campaigns.filter(c => c.status === 'completed').length + 1; // including baseline past
  document.getElementById('stat-camps-count').textContent = completedCamps;

  const totalVolunteers = state.registrations.length + 62;
  document.getElementById('stat-volunteers-count').textContent = totalVolunteers;

  // Render 3 featured activities
  const featGrid = document.getElementById('homeFeaturedGrid');
  if (!featGrid) return;

  const upcoming = state.campaigns.slice(0, 3);
  featGrid.innerHTML = upcoming.map(c => renderCampaignCard(c)).join('');
}

// RENDER EXPLORE VIEW
let currentCampaignCategory = 'all';
let currentCampaignSearch = '';

function filterCampaigns(category, btnElement) {
  currentCampaignCategory = category;
  document.querySelectorAll('#campaignCategoryFilters .filter-chip').forEach(chip => {
    chip.classList.toggle('active', btnElement ? chip === btnElement : (chip.getAttribute('onclick') || '').includes(`'${category}'`));
  });
  renderExplore();
}

function searchCampaigns(query) {
  currentCampaignSearch = query.toLowerCase();
  renderExplore();
}

function renderExplore() {
  const grid = document.getElementById('exploreCampaignsGrid');
  if (!grid) return;

  let list = state.campaigns;
  if (currentCampaignCategory !== 'all') {
    list = list.filter(c => c.category === currentCampaignCategory);
  }
  if (currentCampaignSearch) {
    list = list.filter(c => c.title.toLowerCase().includes(currentCampaignSearch) || c.area.toLowerCase().includes(currentCampaignSearch));
  }

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
      <h3>No activities found</h3>
      <p>Try clearing filters or search term.</p>
    </div>`;
    return;
  }

  grid.innerHTML = list.map(c => renderCampaignCard(c)).join('');
}

function renderCampaignCard(c) {
  const percent = Math.min(100, Math.round((c.registeredCount / c.capacity) * 100));
  const isFull = c.registeredCount >= c.capacity;
  const statusBadge = isFull ? '<span class="badge badge-full">Full</span>' : `<span class="badge badge-${c.status}">${c.status.toUpperCase()}</span>`;
  const locationLabel = c.city ? `${escapeHtml(c.city)}, ${escapeHtml(c.state || 'India')}` : escapeHtml(c.area);

  return `
    <div class="card">
      <div>
        <div class="card-top">
          <span class="badge badge-accepted">${c.category}</span>
          ${statusBadge}
        </div>
        <h4 class="card-title">${escapeHtml(c.title)}</h4>
        <p class="card-desc">${escapeHtml(c.goal)}</p>

        <div class="capacity-bar-container">
          <div class="capacity-labels">
            <span>Volunteer Spots</span>
            <span>${c.registeredCount} / ${c.capacity} (${percent}%)</span>
          </div>
          <div class="capacity-track">
            <div class="capacity-fill" style="width: ${percent}%;"></div>
          </div>
        </div>

        <div class="card-meta">
          <div class="card-meta-row">📍 <strong>Location:</strong> ${locationLabel} (${escapeHtml(c.area)})</div>
          <div class="card-meta-row">📅 <strong>Date:</strong> ${formatDateTime(c.dateTime)}</div>
          <div class="card-meta-row">🛡️ <strong>Safety:</strong> ${escapeHtml(c.safetyNotes)}</div>
        </div>
      </div>

      <div class="card-footer">
        <span style="font-size:0.75rem; color:var(--text-muted);">👤 ${escapeHtml(c.organizer)}</span>
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
          ${c.status === 'completed'
            ? `<button class="btn btn-secondary btn-sm" onclick="switchView('impact')">View Results</button>`
            : isFull
              ? `<button class="btn btn-secondary btn-sm" disabled>Spots Filled</button>`
              : `<button class="btn btn-primary btn-sm" onclick="openRegisterModal('${c.id}')">Join Drive 🎟️</button>`
          }
          <button class="btn btn-secondary btn-sm" onclick="openUploadPhotoModal('${c.id}')" title="Upload action photo from this campaign">📸 Photo</button>
        </div>
      </div>
    </div>
  `;
}

// RENDER NEED BOARD
let currentNeedFilter = 'all';

function filterNeeds(status, btnElement) {
  currentNeedFilter = status;
  document.querySelectorAll('#needStatusFilters .filter-chip').forEach(chip => {
    chip.classList.toggle('active', btnElement ? chip === btnElement : (chip.getAttribute('onclick') || '').includes(`'${status}'`));
  });
  renderNeedsBoard();
}

function renderNeedsBoard() {
  const grid = document.getElementById('needsBoardGrid');
  const countBadge = document.getElementById('needsCountBadge');
  if (!grid) return;

  let list = state.reports;
  if (currentNeedFilter !== 'all') {
    list = list.filter(r => r.status === currentNeedFilter);
  }

  if (countBadge) {
    countBadge.textContent = `${list.length} Reports Shown`;
  }

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
      <h3>No reports in this category</h3>
      <p>Have an issue to report? Click "+ Submit a Need".</p>
    </div>`;
    return;
  }

  grid.innerHTML = list.map(r => {
    return `
      <div class="card">
        <div>
          <div class="card-top">
            <span class="badge badge-accepted">${r.category}</span>
            <span class="badge badge-${r.status}">${r.status.replace('_', ' ').toUpperCase()}</span>
          </div>

          <h4 class="card-title">${escapeHtml(r.title)}</h4>
          <p class="card-desc">${escapeHtml(r.description)}</p>

          ${r.photoUrl ? `<div style="margin-bottom:0.75rem;"><img src="${r.photoUrl}" alt="Need evidence" style="width:100%; height:140px; object-fit:cover; border-radius:var(--radius-md);"></div>` : ''}

          <div class="card-meta">
            <div class="card-meta-row">📍 <strong>Approx Area:</strong> ${escapeHtml(r.area)}</div>
            <div class="card-meta-row">🕒 <strong>Reported:</strong> ${r.createdAt}</div>
            ${r.moderatorNote ? `<div class="card-meta-row" style="color:var(--primary-700);">💬 <strong>Reviewer Note:</strong> ${escapeHtml(r.moderatorNote)}</div>` : ''}
          </div>
        </div>

        <div class="card-footer">
          <button class="btn btn-secondary btn-sm" onclick="upvoteReport('${r.id}')">👍 I'm Affected (${r.upvotes})</button>

          ${r.status === 'accepted'
            ? `<button class="btn btn-accent btn-sm" onclick="convertNeedToCampaign('${r.id}')">⚡ Take Action</button>`
            : r.status === 'converted_to_campaign'
              ? `<button class="btn btn-secondary btn-sm" onclick="switchView('explore')">View Drive →</button>`
              : `<span style="font-size:0.75rem; color:var(--text-muted);">${r.author}</span>`
          }
        </div>
      </div>
    `;
  }).join('');
}

function upvoteReport(reportId) {
  const rep = state.reports.find(r => r.id === reportId);
  if (rep) {
    rep.upvotes += 1;
    saveState();
    renderNeedsBoard();
    showToast(`Upvoted! Total people affected: ${rep.upvotes}`);
  }
}

// RENDER ORGANIZER DESK
function renderOrganizer() {
  const tbody = document.getElementById('organizerCampaignsTableBody');
  const rosterSelect = document.getElementById('rosterCampaignSelect');
  if (!tbody) return;

  // Render Campaigns Table
  tbody.innerHTML = state.campaigns.map(c => {
    return `
      <tr>
        <td><strong>${escapeHtml(c.title)}</strong></td>
        <td><span class="badge badge-accepted">${c.category}</span></td>
        <td>${escapeHtml(c.area)}</td>
        <td>${formatDateTime(c.dateTime)}</td>
        <td>${c.registeredCount} / ${c.capacity}</td>
        <td><span class="badge badge-${c.status}">${c.status.toUpperCase()}</span></td>
        <td>
          <div style="display:flex; gap:0.4rem;">
            ${c.status !== 'completed'
              ? `<button class="btn btn-accent btn-sm" onclick="openImpactModal('${c.id}')">Finish & Report Impact</button>`
              : `<button class="btn btn-secondary btn-sm" disabled>Reported ✅</button>`
            }
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Populate Roster Dropdown
  if (rosterSelect) {
    rosterSelect.innerHTML = state.campaigns.map(c => `
      <option value="${c.id}">${c.title} (${c.area})</option>
    `).join('');
    if (state.campaigns.length > 0) {
      loadRoster(rosterSelect.value || state.campaigns[0].id);
    }
  }
}

function loadRoster(campaignId) {
  const tbody = document.getElementById('rosterTableBody');
  if (!tbody) return;

  const regs = state.registrations.filter(r => r.campaignId === campaignId);
  if (regs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No volunteers registered for this activity yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = regs.map(r => `
    <tr>
      <td><code>${r.ticketCode}</code></td>
      <td><strong>${escapeHtml(r.fullName)}</strong></td>
      <td>${r.locality || 'General Volunteer'}</td>
      <td>${r.registeredAt}</td>
      <td>
        ${r.status === 'attended'
          ? '<span class="badge badge-accepted">Present (Checked In)</span>'
          : '<span class="badge badge-under_review">Registered</span>'
        }
      </td>
      <td>
        ${r.status !== 'attended'
          ? `<button class="btn btn-primary btn-sm" onclick="markAttendance('${r.ticketCode}')">Check In</button>`
          : `<span style="color:var(--accent-emerald); font-weight:700;">✓ Checked</span>`
        }
      </td>
    </tr>
  `).join('');
}

function markAttendance(ticketCode) {
  const reg = state.registrations.find(r => r.ticketCode === ticketCode);
  if (reg) {
    reg.status = 'attended';
    saveState();
    loadRoster(reg.campaignId);
    showToast(`Volunteer ${reg.fullName} checked in successfully!`);
  }
}

function checkinByTicketCode() {
  const input = document.getElementById('ticketCheckinInput');
  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast('Please enter a ticket code');
    return;
  }
  const reg = state.registrations.find(r => r.ticketCode.toUpperCase() === code);
  if (!reg) {
    showToast('Invalid Ticket Code. Not found in records.', 'error');
    return;
  }
  reg.status = 'attended';
  saveState();
  input.value = '';
  loadRoster(reg.campaignId);
  showToast(`Ticket verified! ${reg.fullName} checked in.`);
}

// RENDER MODERATOR DESK
function switchModTab(tab) {
  document.getElementById('modSectionReports').style.display = tab === 'reports' ? 'block' : 'none';
  document.getElementById('modSectionImpact').style.display = tab === 'impact' ? 'block' : 'none';
  document.getElementById('modSectionAudit').style.display = tab === 'audit' ? 'block' : 'none';

  document.getElementById('modTabReportsBtn').classList.toggle('active', tab === 'reports');
  document.getElementById('modTabImpactBtn').classList.toggle('active', tab === 'impact');
  document.getElementById('modTabAuditBtn').classList.toggle('active', tab === 'audit');
}

function renderModerator() {
  // Pending count
  const pendingReports = state.reports.filter(r => r.status === 'under_review');
  const pendingImpact = state.impactReports.filter(i => i.reviewStatus === 'pending');

  document.getElementById('modPendingCount').textContent = pendingReports.length;
  document.getElementById('modImpactPendingCount').textContent = pendingImpact.length;

  // Render Reports Queue
  const reportsTbody = document.getElementById('moderatorNeedsTableBody');
  if (reportsTbody) {
    reportsTbody.innerHTML = state.reports.map(r => `
      <tr>
        <td>${r.createdAt}</td>
        <td><span class="badge badge-accepted">${r.category}</span></td>
        <td>
          <strong>${escapeHtml(r.title)}</strong>
          <p style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(r.description)}</p>
        </td>
        <td>📍 ${escapeHtml(r.area)}</td>
        <td><span class="badge badge-${r.status}">${r.status.toUpperCase()}</span></td>
        <td>
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
            ${r.status === 'under_review' ? `
              <button class="btn btn-accent btn-sm" onclick="moderatorAcceptReport('${r.id}')">Accept</button>
              <button class="btn btn-secondary btn-sm" onclick="moderatorMergeDuplicate('${r.id}')">Merge</button>
              <button class="btn btn-danger btn-sm" onclick="openRejectModal('${r.id}')">Reject</button>
            ` : `
              <span style="font-size:0.75rem; color:var(--text-muted);">Decided</span>
            `}
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Render Impact Verification Queue
  const impactTbody = document.getElementById('moderatorImpactTableBody');
  if (impactTbody) {
    impactTbody.innerHTML = state.impactReports.map(imp => `
      <tr>
        <td><strong>${escapeHtml(imp.campaignTitle)}</strong></td>
        <td>${imp.submittedBy}</td>
        <td>${imp.participantsCount}</td>
        <td>
          <strong>${imp.metricName}</strong><br>
          <span style="font-size:0.8rem; color:var(--text-muted);">Baseline: ${imp.metricBefore} → Final: ${imp.metricAfter}</span>
        </td>
        <td>
          <p style="font-size:0.8rem;">${escapeHtml(imp.summary)}</p>
          ${imp.evidenceUrl ? `<a href="${imp.evidenceUrl}" target="_blank" style="font-size:0.75rem; color:var(--primary-600);">📷 View Evidence Photo</a>` : ''}
        </td>
        <td>
          ${imp.reviewStatus === 'pending' ? `
            <div style="display:flex; gap:0.4rem;">
              <button class="btn btn-accent btn-sm" onclick="moderatorApproveImpact('${imp.id}')">Verify & Approve</button>
              <button class="btn btn-secondary btn-sm" onclick="moderatorRequestChanges('${imp.id}')">Ask Edits</button>
            </div>
          ` : `
            <span class="badge badge-verified">Approved ✅</span>
          `}
        </td>
      </tr>
    `).join('');
  }

  // Render Audit Trail
  const auditTbody = document.getElementById('auditTableBody');
  if (auditTbody) {
    auditTbody.innerHTML = state.auditLogs.map(log => `
      <tr>
        <td>${log.timestamp}</td>
        <td><strong>${escapeHtml(log.actor)}</strong></td>
        <td><code>${log.action}</code></td>
        <td>${escapeHtml(log.entity)}</td>
        <td>${escapeHtml(log.reason || 'None recorded')}</td>
      </tr>
    `).join('');
  }
}

function moderatorAcceptReport(reportId) {
  const rep = state.reports.find(r => r.id === reportId);
  if (rep) {
    rep.status = 'accepted';
    rep.moderatorNote = 'Accepted for volunteer mobilization by Moderator';
    addAuditLog('ACCEPT_REPORT', `Report #${reportId}`, 'Verified non-emergency need within community pilot radius');
    saveState();
    renderModerator();
    showToast(`Report accepted! Organizers can now convert it to a campaign.`);
  }
}

function moderatorMergeDuplicate(reportId) {
  const rep = state.reports.find(r => r.id === reportId);
  if (rep) {
    rep.status = 'duplicate';
    rep.moderatorNote = 'Merged with existing civic report';
    addAuditLog('MERGE_DUPLICATE', `Report #${reportId}`, 'Identified duplicate neighborhood issue');
    saveState();
    renderModerator();
    showToast(`Report marked as merged duplicate.`);
  }
}

let activeRejectReportId = null;
function openRejectModal(reportId) {
  activeRejectReportId = reportId;
  openModal('rejectModal');
}

function toggleCustomReason(val) {
  document.getElementById('rejectCustomReason').style.display = val === 'Custom' ? 'block' : 'none';
}

function confirmRejection() {
  if (!activeRejectReportId) return;
  const rep = state.reports.find(r => r.id === activeRejectReportId);
  if (!rep) return;

  const selectVal = document.getElementById('rejectReasonSelect').value;
  const customVal = document.getElementById('rejectCustomReason').value;
  const reason = selectVal === 'Custom' ? customVal : selectVal;

  rep.status = 'rejected';
  rep.moderatorNote = `Rejected: ${reason}`;
  addAuditLog('REJECT_REPORT', `Report #${activeRejectReportId}`, reason);
  saveState();

  closeModal('rejectModal');
  renderModerator();
  showToast(`Report rejected and logged in audit trail.`);
}

function moderatorApproveImpact(impactId) {
  const imp = state.impactReports.find(i => i.id === impactId);
  if (imp) {
    imp.reviewStatus = 'approved';
    imp.reviewedBy = 'Moderator / Admin';
    imp.reviewedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

    // Also mark source campaign as completed
    const camp = state.campaigns.find(c => c.id === imp.campaignId);
    if (camp) camp.status = 'completed';

    addAuditLog('APPROVE_IMPACT', `Impact #${impactId}`, 'Evidence photo & outcome metrics verified for public ledger');
    saveState();
    renderModerator();
    showToast(`Impact verified! Posted to Public Impact Ledger 🎉`);
  }
}

function moderatorRequestChanges(impactId) {
  const imp = state.impactReports.find(i => i.id === impactId);
  if (imp) {
    imp.reviewStatus = 'changes_requested';
    addAuditLog('REQUEST_CHANGES', `Impact #${impactId}`, 'Organizer requested to clarify before/after metrics');
    saveState();
    renderModerator();
    showToast(`Feedback sent to organizer for revisions.`);
  }
}

function addAuditLog(action, entity, reason) {
  state.auditLogs.unshift({
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    actor: state.currentPersona.toUpperCase(),
    action,
    entity,
    reason
  });
}

// RENDER IMPACT LEDGER
let currentImpactChartFilter = 'all';

function filterImpactChart(category, btnElement) {
  currentImpactChartFilter = category;
  document.querySelectorAll('#impactChartFilters .filter-chip').forEach(chip => {
    chip.classList.toggle('active', btnElement ? chip === btnElement : (chip.getAttribute('onclick') || '').includes(`'${category}'`));
  });
  renderImpactChart();
}

function renderImpactChart() {
  const container = document.getElementById('impactChartContainer');
  if (!container) return;

  const verified = state.impactReports.filter(i => i.reviewStatus === 'approved');
  let filtered = verified;

  if (currentImpactChartFilter === 'waste') {
    filtered = verified.filter(i => (i.metricName || '').toLowerCase().includes('waste') || (i.metricName || '').toLowerCase().includes('silt') || (i.category || '').toLowerCase() === 'cleanliness');
  } else if (currentImpactChartFilter === 'plantation') {
    filtered = verified.filter(i => (i.metricName || '').toLowerCase().includes('tree') || (i.metricName || '').toLowerCase().includes('sapling') || (i.category || '').toLowerCase() === 'environment');
  } else if (currentImpactChartFilter === 'safety') {
    filtered = verified.filter(i => (i.metricName || '').toLowerCase().includes('dark') || (i.metricName || '').toLowerCase().includes('spot') || (i.category || '').toLowerCase() === 'safety');
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:1.5rem; color:var(--text-muted);">No verified impact entries under this category yet.</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const before = Number(item.metricBefore) || 0;
    const after = Number(item.metricAfter) || 0;
    const maxVal = Math.max(before, after, 1);
    const isReduction = before > after;

    const beforeWidth = Math.max(Math.round((before / maxVal) * 100), 6);
    const afterWidth = isReduction && after === 0 ? 0 : Math.max(Math.round((after / maxVal) * 100), 6);

    let badgeHtml = '';
    if (isReduction) {
      const pct = Math.round(((before - after) / (before || 1)) * 100);
      badgeHtml = `<span class="chart-improvement-badge badge-positive-reduction">✅ ${pct}% Cleared / Hazard Reduced</span>`;
    } else {
      const gain = after - before;
      badgeHtml = `<span class="chart-improvement-badge badge-positive-gain">🌱 +${gain} Created</span>`;
    }

    return `
      <div class="chart-row">
        <div class="chart-campaign-meta">
          <span class="chart-campaign-title">${escapeHtml(item.campaignTitle)}</span>
          <div class="chart-meta-badges">
            <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(item.metricName)}</span>
            ${badgeHtml}
          </div>
        </div>

        <div class="chart-bars-wrap">
          <div class="chart-bar-entry">
            <span class="chart-bar-label">🔴 Baseline:</span>
            <div class="chart-track">
              <div class="chart-fill chart-fill-before" style="width: ${beforeWidth}%;"></div>
            </div>
            <span class="chart-bar-value">${before} units</span>
          </div>

          <div class="chart-bar-entry">
            <span class="chart-bar-label">🟢 Verified:</span>
            <div class="chart-track">
              <div class="chart-fill chart-fill-after" style="width: ${afterWidth}%;"></div>
            </div>
            <span class="chart-bar-value">${after} units</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderImpact() {
  const verifiedList = state.impactReports.filter(i => i.reviewStatus === 'approved');

  const completedEl = document.getElementById('ledgerCompletedCount');
  if (completedEl) completedEl.textContent = verifiedList.length;

  // Calculate dynamic sums for waste, saplings/trees, and feedback rating
  let totalWasteKg = 0;
  let totalTrees = 0;
  verifiedList.forEach(imp => {
    const metric = (imp.metricName || '').toLowerCase();
    const before = Number(imp.metricBefore) || 0;
    const after = Number(imp.metricAfter) || 0;
    const diff = Math.abs(before - after);
    if (metric.includes('waste') || metric.includes('plastic') || metric.includes('silt') || metric.includes('kg')) {
      totalWasteKg += Math.max(before, after, diff);
    }
    if (metric.includes('tree') || metric.includes('sapling') || metric.includes('terrace')) {
      totalTrees += Math.max(after, diff);
    }
  });

  const wasteEl = document.getElementById('ledgerWasteCount');
  if (wasteEl) wasteEl.textContent = `${totalWasteKg || 920} kg`;

  const saplingsEl = document.getElementById('ledgerSaplingsCount');
  if (saplingsEl) saplingsEl.textContent = totalTrees || 45;

  const feedbackList = state.feedback || [];
  const avgRating = feedbackList.length > 0 
    ? (feedbackList.reduce((sum, f) => sum + (Number(f.rating) || 5), 0) / feedbackList.length).toFixed(1)
    : '4.9';
  const scoreEl = document.getElementById('ledgerFeedbackScore');
  if (scoreEl) scoreEl.textContent = `${avgRating} / 5`;

  const scorecardFeedbackEl = document.getElementById('scorecardFeedback');
  if (scorecardFeedbackEl) scorecardFeedbackEl.textContent = `${avgRating} / 5`;

  // Render the visual comparison chart
  renderImpactChart();

  const grid = document.getElementById('impactLedgerGrid');
  if (!grid) return;

  grid.innerHTML = verifiedList.map(imp => {
    const before = Number(imp.metricBefore) || 0;
    const after = Number(imp.metricAfter) || 0;
    const isReduction = before > after;
    let badgeText = '';
    let progressPct = 100;
    let progressLabel = '';

    if (isReduction) {
      const reduction = before - after;
      const pct = Math.round((reduction / (before || 1)) * 100);
      badgeText = `🎉 ${pct}% Cleared / Hazard Reduced`;
      progressPct = pct;
      progressLabel = `${reduction} units successfully cleared (${pct}% reduction)`;
    } else {
      const gain = after - before;
      badgeText = `🌱 +${gain} Established`;
      progressPct = 100;
      progressLabel = `Target 100% Achieved (+${gain} outcome)`;
    }

    return `
    <div class="card">
      <div>
        <div class="card-top">
          <span class="badge badge-verified">🛡️ Verified Ledger Entry</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${imp.reviewedAt}</span>
        </div>

        <h4 class="card-title">${escapeHtml(imp.campaignTitle)}</h4>
        <p class="card-desc">${escapeHtml(imp.summary)}</p>

        <!-- Visual Before & After Progress Gauge -->
        <div class="card-before-after-box">
          <div class="ba-badges-row">
            <div class="ba-badge-group">
              <span class="ba-badge ba-badge-before">Baseline: ${imp.metricBefore}</span>
              <span class="ba-arrow">➔</span>
              <span class="ba-badge ba-badge-after">Verified: ${imp.metricAfter}</span>
            </div>
            <span class="chart-improvement-badge ${isReduction ? 'badge-positive-reduction' : 'badge-positive-gain'}">
              ${badgeText}
            </span>
          </div>
          <div class="ba-progress-track">
            <div class="ba-progress-fill" style="width: ${progressPct}%;"></div>
          </div>
          <div class="ba-progress-sub">
            <span>Metric: ${escapeHtml(imp.metricName)}</span>
            <span>${progressLabel}</span>
          </div>
        </div>

        ${imp.evidenceUrl ? `
          <div style="margin-bottom:0.75rem;">
            <img src="${imp.evidenceUrl}" alt="Impact proof" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-md);">
          </div>
        ` : ''}

        <div class="card-meta">
          <div class="card-meta-row">👥 <strong>Participants:</strong> ${imp.participantsCount} Verified Volunteers</div>
          <div class="card-meta-row">🛡️ <strong>Verified By:</strong> ${escapeHtml(imp.reviewedBy)}</div>
        </div>
      </div>

      <div class="card-footer">
        <button class="btn btn-secondary btn-sm" onclick="openFeedbackModal('${imp.campaignId}')">⭐ Leave Feedback</button>
        <span style="font-size:0.75rem; color:var(--text-muted);">Lead: ${escapeHtml(imp.submittedBy)}</span>
      </div>
    </div>
    `;
  }).join('');
}

// ==========================================
// 7. USER ACTIONS & FORM HANDLERS
// ==========================================

// Handle Need Submission
function handleReportSubmit(e) {
  e.preventDefault();
  const category = document.getElementById('reportCategory').value;
  const title = document.getElementById('reportTitle').value.trim();
  const area = document.getElementById('reportArea').value.trim();
  const author = document.getElementById('reportAuthor').value.trim() || 'Resident';
  const desc = document.getElementById('reportDesc').value.trim();
  const photoUrl = document.getElementById('reportPhotoUrl').value.trim();

  const newReport = {
    id: `rep-${Date.now()}`,
    title,
    category,
    area,
    author,
    description: desc,
    photoUrl,
    status: 'under_review',
    upvotes: 1,
    moderatorNote: null,
    createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
  };

  state.reports.unshift(newReport);
  addAuditLog('SUBMIT_REPORT', `Report #${newReport.id}`, `Report submitted by ${author} in ${area}`);
  saveState();

  document.getElementById('reportForm').reset();
  showToast('Community need submitted! A moderator will review it within 48h. 📋');
  switchView('needs');
}

function setSamplePhoto(type) {
  const input = document.getElementById('reportPhotoUrl');
  if (type === 'waste') {
    input.value = 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80';
  } else if (type === 'lamp') {
    input.value = 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80';
  } else if (type === 'puddle') {
    input.value = 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?auto=format&fit=crop&w=600&q=80';
  }
}

// Awareness-to-Action: Convert Need to Campaign
function convertNeedToCampaign(reportId) {
  const rep = state.reports.find(r => r.id === reportId);
  if (!rep) return;

  switchView('organizer');
  openCreateCampaignModal();

  // Pre-fill
  const select = document.getElementById('campSourceReport');
  select.value = rep.id;
  autoFillFromReport(rep.id);
}

function autoFillFromReport(reportId) {
  if (!reportId) return;
  const rep = state.reports.find(r => r.id === reportId);
  if (!rep) return;

  document.getElementById('campTitle').value = `${rep.area} Community Action Drive`;
  document.getElementById('campCategory').value = rep.category;
  document.getElementById('campArea').value = rep.area;
  document.getElementById('campGoal').value = `Directly address verified community need: ${rep.title}. Work with local volunteers to clear the issue safely.`;
}

// Open / Close Modals
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

function closeModalOnOutsideClick(e, id) {
  if (e.target.id === id) closeModal(id);
}

// Create Campaign Modal
function openCreateCampaignModal() {
  const select = document.getElementById('campSourceReport');
  const acceptedReports = state.reports.filter(r => r.status === 'accepted');

  select.innerHTML = '<option value="">-- Standalone Activity (or pick an accepted need) --</option>' +
    acceptedReports.map(r => `<option value="${r.id}">[Need] ${r.title} (${r.area})</option>`).join('');

  // default date
  const now = new Date();
  now.setDate(now.getDate() + 3);
  document.getElementById('campDateTime').value = now.toISOString().slice(0, 16);

  openModal('createCampaignModal');
}

function handleCreateCampaignSubmit(e) {
  e.preventDefault();
  const sourceReportId = document.getElementById('campSourceReport').value;
  const title = document.getElementById('campTitle').value.trim();
  const category = document.getElementById('campCategory').value;
  const capacity = parseInt(document.getElementById('campCapacity').value, 10);
  const area = document.getElementById('campArea').value.trim();
  const dateTime = document.getElementById('campDateTime').value;
  const goal = document.getElementById('campGoal').value.trim();
  const safetyNotes = document.getElementById('campSafety').value.trim();

  const newCamp = {
    id: `camp-${Date.now()}`,
    sourceReportId: sourceReportId || null,
    title,
    category,
    capacity,
    area,
    dateTime,
    goal,
    safetyNotes,
    organizer: 'Student Coordinator',
    status: 'published',
    registeredCount: 0
  };

  // If linked to report, update report status
  if (sourceReportId) {
    const rep = state.reports.find(r => r.id === sourceReportId);
    if (rep) {
      rep.status = 'converted_to_campaign';
      rep.moderatorNote = `Converted to Campaign "${title}"`;
    }
  }

  state.campaigns.unshift(newCamp);
  addAuditLog('CREATE_CAMPAIGN', `Campaign #${newCamp.id}`, `Published new campaign: ${title}`);
  saveState();

  closeModal('createCampaignModal');
  document.getElementById('createCampaignForm').reset();
  showToast('Campaign successfully published! Volunteers can now register. 🚀');
  renderOrganizer();
  switchView('explore');
}

// Register for Campaign
function openRegisterModal(campId) {
  const camp = state.campaigns.find(c => c.id === campId);
  if (!camp) return;

  document.getElementById('regCampaignId').value = camp.id;
  document.getElementById('regCampaignDetail').textContent = `${camp.title} (${camp.area}) — ${formatDateTime(camp.dateTime)}`;
  openModal('registerModal');
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  const campId = document.getElementById('regCampaignId').value;
  const fullName = document.getElementById('regFullName').value.trim();
  const mobile = document.getElementById('regMobile').value.trim();
  const locality = document.getElementById('regLocality').value.trim();

  const camp = state.campaigns.find(c => c.id === campId);
  if (!camp) return;

  if (camp.registeredCount >= camp.capacity) {
    showToast('Sorry! This activity has reached maximum capacity.', 'error');
    return;
  }

  const ticketCode = `JAG-${Math.floor(1000 + Math.random() * 9000)}-VOL`;

  const newReg = {
    ticketCode,
    campaignId: camp.id,
    fullName,
    mobile,
    locality,
    role: state.currentPersona,
    status: 'registered',
    registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
  };

  camp.registeredCount += 1;
  state.registrations.unshift(newReg);
  addAuditLog('REGISTER_VOLUNTEER', `Campaign #${camp.id}`, `Volunteer ${fullName} registered with pass ${ticketCode}`);
  saveState();

  closeModal('registerModal');
  document.getElementById('campaignRegisterForm').reset();

  // Show digital pass modal
  document.getElementById('ticketCampaignTitle').textContent = camp.title;
  document.getElementById('ticketCodeDisplay').textContent = ticketCode;
  document.getElementById('ticketVolunteerName').textContent = `Volunteer: ${fullName}`;
  document.getElementById('ticketDateArea').textContent = `${formatDateTime(camp.dateTime)} @ ${camp.area}`;
  openModal('ticketModal');

  renderExplore();
  renderHome();
}

// Submit Impact Report
function openImpactModal(campId) {
  const camp = state.campaigns.find(c => c.id === campId);
  if (!camp) return;

  document.getElementById('impactCampId').value = camp.id;
  document.getElementById('impactCampTitle').textContent = `${camp.title} (${camp.area})`;
  document.getElementById('impactParticipants').value = camp.registeredCount || 15;

  openModal('impactReportModal');
}

function handleImpactReportSubmit(e) {
  e.preventDefault();
  const campId = document.getElementById('impactCampId').value;
  const participants = parseInt(document.getElementById('impactParticipants').value, 10);
  const metricName = document.getElementById('impactMetricName').value.trim();
  const before = parseFloat(document.getElementById('impactBefore').value) || 0;
  const after = parseFloat(document.getElementById('impactAfter').value) || 0;
  const summary = document.getElementById('impactSummary').value.trim();
  const evidenceUrl = document.getElementById('impactEvidenceUrl').value.trim();

  const camp = state.campaigns.find(c => c.id === campId);

  const newImpact = {
    id: `imp-${Date.now()}`,
    campaignId: campId,
    campaignTitle: camp ? camp.title : 'Community Activity',
    submittedBy: 'Student Organizer',
    participantsCount: participants,
    metricName,
    metricBefore: before,
    metricAfter: after,
    summary,
    evidenceUrl,
    reviewStatus: 'pending',
    reviewedBy: null,
    reviewedAt: null
  };

  state.impactReports.unshift(newImpact);
  if (camp) camp.status = 'in_progress';
  addAuditLog('SUBMIT_IMPACT', `Campaign #${campId}`, 'Organizer submitted outcome for Moderator verification');
  saveState();

  closeModal('impactReportModal');
  document.getElementById('impactReportForm').reset();
  showToast('Impact report submitted! Now awaiting Moderator verification. 🛡️');
  renderOrganizer();
}

// Feedback Modal
function openFeedbackModal(campId) {
  document.getElementById('feedbackCampId').value = campId;
  openModal('feedbackModal');
}

function handleFeedbackSubmit(e) {
  e.preventDefault();
  const campId = document.getElementById('feedbackCampId').value;
  const rating = parseInt(document.getElementById('feedbackRating').value, 10);
  const awareness = document.getElementById('feedbackAwareness').value;
  const comments = document.getElementById('feedbackComments').value.trim();

  state.feedback.unshift({
    campaignId,
    rating,
    awareness,
    comments
  });
  saveState();

  closeModal('feedbackModal');
  document.getElementById('feedbackForm').reset();
  showToast('Thank you! Your feedback helps us improve future drives. ⭐');
}

// ==========================================
// 8. 60-SECOND GUIDED DEMO TOUR (PRD SEC 19)
// ==========================================
let demoStep = 1;

function startDemoTour() {
  demoStep = 1;
  document.getElementById('demoOverlayBar').classList.add('active');
  executeDemoStep(1);
}

function stopDemoTour() {
  document.getElementById('demoOverlayBar').classList.remove('active');
  showToast('Demo tour ended. You can explore freely!');
}

function advanceDemoStep() {
  demoStep += 1;
  if (demoStep > 7) {
    stopDemoTour();
    showToast('🎉 Demo Completed! The PRD 7-step cycle has been fully demonstrated.');
    return;
  }
  executeDemoStep(demoStep);
}

function executeDemoStep(step) {
  const title = document.getElementById('demoStepTitle');
  const desc = document.getElementById('demoStepDesc');

  switch (step) {
    case 1:
      title.textContent = "🎬 Step 1/7: Concept & Awareness-to-Action";
      desc.textContent = "Welcome to JAGRUK! Here on the home page, community problems are matched directly to volunteer action.";
      switchView('home');
      break;

    case 2:
      title.textContent = "📢 Step 2/7: Resident Submits Non-Emergency Report";
      desc.textContent = "Residents report neighborhood issues without exposing exact home addresses.";
      switchView('report');
      document.getElementById('reportCategory').value = 'Cleanliness';
      document.getElementById('reportTitle').value = 'Demo: Accumulated garbage near community park entrance';
      document.getElementById('reportArea').value = 'Dighori Ring Road';
      document.getElementById('reportDesc').value = 'Uncollected plastic sacks and garden waste dumped for 4 days.';
      setSamplePhoto('waste');
      document.getElementById('consentNonEmergency').checked = true;
      document.getElementById('consentPrivacy').checked = true;
      break;

    case 3:
      title.textContent = "🛡️ Step 3/7: Moderator Reviews & Accepts";
      desc.textContent = "Moderator verifies the report, merges duplicates, and accepts it for student mobilization.";
      switchView('moderator');
      switchModTab('reports');
      break;

    case 4:
      title.textContent = "⚡ Step 4/7: Organizer Converts Need to Campaign";
      desc.textContent = "Organizer launches a planned drive linked directly to the accepted community report.";
      switchView('organizer');
      openCreateCampaignModal();
      break;

    case 5:
      title.textContent = "🎟️ Step 5/7: Volunteer Registers & Gets Pass";
      desc.textContent = "Volunteers browse verified drives and register in 1 click, receiving an official pass code.";
      closeModal('createCampaignModal');
      switchView('explore');
      if (state.campaigns.length > 0) {
        openRegisterModal(state.campaigns[0].id);
        document.getElementById('regFullName').value = 'Demo Volunteer';
        document.getElementById('regConsentSafety').checked = true;
      }
      break;

    case 6:
      title.textContent = "📈 Step 6/7: Check-in & Submit Impact Report";
      desc.textContent = "Organizer verifies attendees and files measurable before/after outcomes.";
      closeModal('registerModal');
      closeModal('ticketModal');
      switchView('organizer');
      if (state.campaigns.length > 0) {
        openImpactModal(state.campaigns[0].id);
        document.getElementById('impactMetricName').value = 'Kg Waste Collected';
        document.getElementById('impactBefore').value = '350';
        document.getElementById('impactAfter').value = '0';
        document.getElementById('impactSummary').value = 'Successfully cleared the entire entrance area with 20 student volunteers.';
      }
      break;

    case 7:
      title.textContent = "📊 Step 7/7: Moderator Verifies & Impact Ledger Posts";
      desc.textContent = "Outcomes are verified against photos and posted permanently on the public Verified Impact Ledger.";
      closeModal('impactReportModal');
      switchView('impact');
      break;
  }
}

// ==========================================
// 9. HELPER UTILITIES
// ==========================================
function formatDateTime(isoString) {
  if (!isoString) return 'TBA';
  try {
    const d = new Date(isoString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    return isoString;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${type === 'error' ? '⚠️' : '✨'}</span> <span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================
// 10. APP INITIALIZATION & PAN-INDIA MODULE
// ==========================================
let currentPanIndiaState = 'all';
let currentPanIndiaPhotoCategory = 'all';
let currentPanIndiaSubtab = 'photos';
let tempUploadedPhotoDataUrl = '';

// Sub-Tab Switcher (Photos vs Campaigns)
function switchPanIndiaSubtab(tab) {
  currentPanIndiaSubtab = tab;
  document.getElementById('subtabSectionPhotos').style.display = tab === 'photos' ? 'block' : 'none';
  document.getElementById('subtabSectionCampaigns').style.display = tab === 'campaigns' ? 'block' : 'none';

  document.getElementById('subtabPhotoWallBtn').classList.toggle('active', tab === 'photos');
  document.getElementById('subtabCampaignsBtn').classList.toggle('active', tab === 'campaigns');

  if (tab === 'photos') renderPanIndiaPhotos();
  if (tab === 'campaigns') renderPanIndiaCampaigns();
}

// State Filter
function filterPanIndiaState(stateName, btnElement) {
  currentPanIndiaState = stateName;
  document.querySelectorAll('#panIndiaStateChips .state-chip').forEach(chip => {
    chip.classList.toggle('active', btnElement ? chip === btnElement : (chip.getAttribute('onclick') || '').includes(`'${stateName}'`));
  });

  renderPanIndia();
  showToast(`Filtering by region: ${stateName === 'all' ? 'All India' : stateName}`);
}

// Photo Category Filter
function filterPanIndiaPhotoCategory(category, btnElement) {
  currentPanIndiaPhotoCategory = category;
  document.querySelectorAll('#panIndiaPhotoCategoryFilters .filter-chip').forEach(chip => {
    chip.classList.toggle('active', btnElement ? chip === btnElement : (chip.getAttribute('onclick') || '').includes(`'${category}'`));
  });

  renderPanIndiaPhotos();
}

// Master Pan-India View Render
function renderPanIndia() {
  const photos = state.campaignPhotos || [];
  const campaigns = state.campaigns || [];

  // Update Barometer stats
  const statesSet = new Set();
  campaigns.forEach(c => { if (c.state) statesSet.add(c.state); });
  photos.forEach(p => { if (p.state) statesSet.add(p.state); });
  const statesCount = Math.max(statesSet.size, 8);

  const statStates = document.getElementById('pi-stat-states');
  if (statStates) statStates.textContent = `${statesCount} States`;

  const statPhotos = document.getElementById('pi-stat-photos');
  if (statPhotos) statPhotos.textContent = photos.length;

  const countBadge = document.getElementById('panIndiaPhotoCount');
  if (countBadge) countBadge.textContent = photos.length;

  const campCountBadge = document.getElementById('panIndiaCampsCount');
  if (campCountBadge) campCountBadge.textContent = campaigns.length;

  renderPanIndiaPhotos();
  renderPanIndiaCampaigns();
}

// Render Photo Wall Stream
function renderPanIndiaPhotos() {
  const grid = document.getElementById('panIndiaPhotoGrid');
  if (!grid) return;

  let list = state.campaignPhotos || [];

  // Filter by state
  if (currentPanIndiaState !== 'all') {
    list = list.filter(p => p.state && p.state.toLowerCase() === currentPanIndiaState.toLowerCase());
  }

  // Filter by category
  if (currentPanIndiaPhotoCategory !== 'all') {
    list = list.filter(p => p.category === currentPanIndiaPhotoCategory);
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted); background:var(--bg-card); border-radius:var(--radius-lg); border:1px dashed var(--border-color);">
        <div style="font-size:2.5rem; margin-bottom:0.5rem;">📸</div>
        <h3>No photos uploaded yet for this filter</h3>
        <p>Participating in an environmental drive or tea/tree plantation? Be the first to upload!</p>
        <button class="btn btn-primary" style="margin-top:1rem;" onclick="openUploadPhotoModal()">Upload Action Photo Now 🚀</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(p => renderPanIndiaPhotoCard(p)).join('');
}

// Render individual photo card
function renderPanIndiaPhotoCard(p) {
  const avatarLetter = (p.volunteerName || 'V').charAt(0).toUpperCase();

  return `
    <div class="photo-card">
      <div class="photo-img-wrap">
        <img src="${escapeHtml(p.photoUrl)}" alt="Citizen action proof" loading="lazy">
        <span class="photo-tag-location">📍 ${escapeHtml(p.city)}, ${escapeHtml(p.state)}</span>
        <span class="photo-tag-category">${escapeHtml(p.category || 'Green Action')}</span>
      </div>

      <div class="photo-body">
        <div class="photo-author-row">
          <div class="photo-author-avatar">${avatarLetter}</div>
          <div>
            <div class="photo-author-name">${escapeHtml(p.volunteerName)}</div>
            <div class="photo-author-time">🕒 ${escapeHtml(p.uploadedAt || 'Recent Action')}</div>
          </div>
        </div>

        <a href="javascript:void(0)" class="photo-campaign-link" onclick="openPhotoCampaignDetails('${p.campaignId}')">
          🌱 ${escapeHtml(p.campaignTitle)}
        </a>

        <p class="photo-caption">${escapeHtml(p.caption)}</p>

        ${p.metric ? `<div class="photo-metric-badge">✨ <strong>Impact:</strong> ${escapeHtml(p.metric)}</div>` : ''}

        <div class="photo-footer">
          <button class="btn-cheer" id="cheer-btn-${p.id}" onclick="applaudPhoto('${p.id}')">
            <span>👏</span> <span>Cheers (<strong id="cheer-count-${p.id}">${p.cheers || 1}</strong>)</span>
          </button>

          <button class="btn-cert" onclick="openCertificateModal('${p.id}')">
            🏅 View Certificate
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render Pan-India Campaigns Directory Tab
function renderPanIndiaCampaigns() {
  const grid = document.getElementById('panIndiaCampaignsGrid');
  if (!grid) return;

  let list = state.campaigns || [];
  if (currentPanIndiaState !== 'all') {
    list = list.filter(c => c.state && c.state.toLowerCase() === currentPanIndiaState.toLowerCase());
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
        <h3>No campaigns found for ${escapeHtml(currentPanIndiaState)}</h3>
        <p>Want to start an activity in this state? Click below to organize!</p>
        <button class="btn btn-primary" style="margin-top:1rem;" onclick="openCreateCampaignModal()">Launch Activity Here</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(c => renderCampaignCard(c)).join('');
}

function openPhotoCampaignDetails(campaignId) {
  if (!campaignId) return;
  const camp = state.campaigns.find(c => c.id === campaignId);
  if (camp) {
    switchView('explore');
    searchCampaigns(camp.title);
  }
}

// Applaud / Cheer button
function applaudPhoto(photoId) {
  const photo = state.campaignPhotos.find(p => p.id === photoId);
  if (!photo) return;

  photo.cheers = (photo.cheers || 0) + 1;
  saveState();

  const countEl = document.getElementById(`cheer-count-${photoId}`);
  if (countEl) countEl.textContent = photo.cheers;

  const btn = document.getElementById(`cheer-btn-${photoId}`);
  if (btn) {
    btn.classList.add('cheered');
    setTimeout(() => btn.classList.remove('cheered'), 600);
  }

  showToast(`👏 Cheered ${photo.volunteerName}'s green action!`);
}

// Populate Campaign select in Upload Modal
function populateUploadCampDropdown(prefillCampId) {
  const select = document.getElementById('uploadPhotoCampSelect');
  if (!select) return;

  const options = state.campaigns.map(c => `
    <option value="${c.id}" ${prefillCampId === c.id ? 'selected' : ''}>
      ${c.title} (${c.city || c.area}, ${c.state || 'India'})
    </option>
  `).join('');

  select.innerHTML = `
    <option value="">-- Independent Citizen Action (Anywhere in India) --</option>
    ${options}
  `;

  if (prefillCampId) {
    autoFillPhotoLocation(prefillCampId);
  }
}

// Open Upload Photo Modal
function openUploadPhotoModal(prefillCampId = '') {
  populateUploadCampDropdown(prefillCampId);
  tempUploadedPhotoDataUrl = '';
  removePhotoPreview();
  openModal('uploadPhotoModal');
}

// Auto-fill state and city when selecting a campaign in upload modal
function autoFillPhotoLocation(campId) {
  if (!campId) return;
  const camp = state.campaigns.find(c => c.id === campId);
  if (camp) {
    if (camp.state) document.getElementById('uploadState').value = camp.state;
    if (camp.city) document.getElementById('uploadCity').value = camp.city;
    if (camp.category) document.getElementById('uploadPhotoCategory').value = camp.category;
  }
}

// Handle File input from user device with FileReader
function handlePhotoFileInput(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast('Please select a valid image file (JPG, PNG, WEBP)', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    tempUploadedPhotoDataUrl = e.target.result;
    showPhotoPreview(tempUploadedPhotoDataUrl);
    showToast('Photo selected from your device! 📸');
  };
  reader.readAsDataURL(file);
}

// Quick Sample Preset Photos
function setSampleUploadPhoto(preset) {
  const presets = {
    'assam-tea': {
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      state: 'Assam',
      city: 'Jorhat',
      category: 'Tea Plantation',
      metric: '75 Assam tea saplings planted',
      caption: 'Organized a tea plantation drive with 30 young students. Soil aerated and seedlings mulched properly!'
    },
    'munnar-tea': {
      url: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
      state: 'Kerala',
      city: 'Munnar',
      category: 'Tea Plantation',
      metric: '50 tea terraces fortified',
      caption: 'Eco-camping in the Western Ghats and planting native tea shrubs for slope preservation.'
    },
    'nagpur-tree': {
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      state: 'Maharashtra',
      city: 'Nagpur',
      category: 'Environment',
      metric: '40 native trees guarded',
      caption: 'Planted native neem, peepal and banyan trees near Nagpur lake catchment zone.'
    },
    'darjeeling-tea': {
      url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      state: 'West Bengal',
      city: 'Darjeeling',
      category: 'Tea Plantation',
      metric: '60 clonal tea bushes planted',
      caption: 'Himalayan terracing drive to prevent monsoon landslides using organic tea root coverage.'
    }
  };

  const p = presets[preset];
  if (!p) return;

  tempUploadedPhotoDataUrl = p.url;
  document.getElementById('uploadPhotoUrl').value = p.url;
  document.getElementById('uploadState').value = p.state;
  document.getElementById('uploadCity').value = p.city;
  document.getElementById('uploadPhotoCategory').value = p.category;
  document.getElementById('uploadPhotoMetric').value = p.metric;
  document.getElementById('uploadPhotoCaption').value = p.caption;

  showPhotoPreview(p.url);
  showToast(`Loaded ${p.category} preset in ${p.city}, ${p.state}! ✨`);
}

function showPhotoPreview(url) {
  const wrap = document.getElementById('photoPreviewWrap');
  const img = document.getElementById('photoPreviewImg');
  if (wrap && img) {
    img.src = url;
    wrap.style.display = 'block';
  }
}

function removePhotoPreview() {
  tempUploadedPhotoDataUrl = '';
  const wrap = document.getElementById('photoPreviewWrap');
  const fileInput = document.getElementById('photoFileInput');
  const urlInput = document.getElementById('uploadPhotoUrl');
  if (wrap) wrap.style.display = 'none';
  if (fileInput) fileInput.value = '';
  if (urlInput) urlInput.value = '';
}

// Handle Photo Submission
function handlePhotoUploadSubmit(e) {
  e.preventDefault();

  const campId = document.getElementById('uploadPhotoCampSelect').value;
  const volunteerName = document.getElementById('uploadVolunteerName').value.trim();
  const category = document.getElementById('uploadPhotoCategory').value;
  const stateVal = document.getElementById('uploadState').value;
  const city = document.getElementById('uploadCity').value.trim();
  const caption = document.getElementById('uploadPhotoCaption').value.trim();
  const metric = document.getElementById('uploadPhotoMetric').value.trim();
  const manualUrl = document.getElementById('uploadPhotoUrl').value.trim();

  const finalPhotoUrl = tempUploadedPhotoDataUrl || manualUrl || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';

  let campTitle = 'Independent All-India Citizen Drive';
  if (campId) {
    const matchedCamp = state.campaigns.find(c => c.id === campId);
    if (matchedCamp) campTitle = matchedCamp.title;
  } else {
    campTitle = `${category} Action Drive (${city}, ${stateVal})`;
  }

  const newPhoto = {
    id: `photo-${Date.now()}`,
    campaignId: campId || null,
    campaignTitle: campTitle,
    category,
    state: stateVal,
    city,
    volunteerName,
    photoUrl: finalPhotoUrl,
    caption,
    metric: metric || 'Citizen Action Verified',
    cheers: 1,
    verified: true,
    uploadedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
  };

  if (!state.campaignPhotos) state.campaignPhotos = [];
  state.campaignPhotos.unshift(newPhoto);

  addAuditLog('UPLOAD_CAMPAIGN_PHOTO', `Photo #${newPhoto.id}`, `Volunteer ${volunteerName} uploaded action photo in ${city}, ${stateVal}`);
  saveState();

  closeModal('uploadPhotoModal');
  document.getElementById('uploadPhotoForm').reset();
  removePhotoPreview();

  showToast('🎉 Photo successfully posted to the All-India Action Wall!');
  renderPanIndia();
  switchView('panindia');

  // Open the Green Hero Certificate automatically!
  setTimeout(() => {
    openCertificateModal(newPhoto.id);
  }, 400);
}

// Green Hero Certificate Modal
function openCertificateModal(photoId) {
  const photo = (state.campaignPhotos || []).find(p => p.id === photoId);
  if (!photo) return;

  document.getElementById('certVolunteerName').textContent = photo.volunteerName || 'Honored Volunteer';
  document.getElementById('certCampaignTitle').textContent = photo.campaignTitle || 'All-India Environmental Campaign';
  document.getElementById('certLocation').textContent = `${photo.city || 'India'}, ${photo.state || ''}`;
  document.getElementById('certMetric').textContent = photo.metric || 'Community Engagement Verified';
  document.getElementById('certCode').textContent = `JAG-IN-${photo.id.slice(-6).toUpperCase()}`;
  document.getElementById('certDate').textContent = photo.uploadedAt || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  openModal('certificateModal');
}

function printCertificate() {
  window.print();
}

// App Initialization
function initApp() {
  // Set theme & language
  document.documentElement.setAttribute('data-theme', state.currentTheme || 'light');
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) themeBtn.textContent = state.currentTheme === 'dark' ? '☀️' : '🌙';

  const langSelect = document.getElementById('languageSelect');
  if (langSelect) langSelect.value = state.currentLanguage || 'en';

  const personaSelect = document.getElementById('personaSelect');
  if (personaSelect) personaSelect.value = state.currentPersona || 'resident';

  renderAllViews();
}

function renderAllViews() {
  renderHome();
  renderPanIndia();
  renderExplore();
  renderNeedsBoard();
  renderOrganizer();
  renderModerator();
  renderImpact();
}

// Run on page load
window.addEventListener('DOMContentLoaded', initApp);
