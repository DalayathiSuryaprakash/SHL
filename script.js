const assessments = {
  "Software Engineer": {
      Entry: ["SHL Coding Simulation", "SHL G+ Test", "Basic Problem Solving"],
      Mid: ["Advanced Coding Assessment", "System Design Evaluation", "OPQ32 Personality", "Technical Leadership Potential"],
      Senior: ["Architecture Design Assessment", "Technical Leadership Judgment", "OPQ32 Personality", "Innovation Mindset"],
      Executive: ["CTO Readiness Assessment", "Enterprise Architecture Evaluation", "Executive Leadership Battery"]
  },
  "Product Manager": {
      Entry: ["Product Thinking Assessment", "Basic Analytics Test", "Communication Skills"],
      Mid: ["Product Strategy Assessment", "Stakeholder Management", "Market Analysis"],
      Senior: ["Strategic Product Leadership", "Executive Communication", "OPQ32"],
      Executive: ["CPO Readiness Assessment", "Enterprise Strategy", "Executive Decision Making"]
  },
  "Data Scientist": {
      Entry: ["Statistical Reasoning", "Python Programming", "Basic ML Concepts"],
      Mid: ["Advanced Statistics", "ML System Design", "Data Visualization"],
      Senior: ["Advanced ML Architecture", "Research Leadership", "Technical Mentorship"],
      Executive: ["AI Strategy Assessment", "Enterprise Data Leadership", "Innovation Direction"]
  },
  "UX Designer": {
      Entry: ["Design Fundamentals", "User Research Basics", "Wireframing Skills"],
      Mid: ["Advanced UI/UX Assessment", "Design Systems Knowledge", "User Testing"],
      Senior: ["Design Leadership", "Strategic UX Thinking", "Team Management"],
      Executive: ["Design Organization Leadership", "Design Strategy", "Innovation Direction"]
  },
  "Marketing Manager": {
      Entry: ["Marketing Fundamentals", "Social Media Strategy", "Basic Analytics"],
      Mid: ["Campaign Management", "Marketing Analytics", "Brand Strategy"],
      Senior: ["Strategic Marketing Leadership", "Advanced Analytics", "Team Leadership"],
      Executive: ["CMO Readiness", "Enterprise Marketing Strategy", "Executive Leadership"]
  },
  "Sales Director": {
      Entry: ["Sales Fundamentals", "Negotiation Skills", "Customer Relations"],
      Mid: ["Sales Strategy", "Team Leadership", "Revenue Planning"],
      Senior: ["Enterprise Sales Leadership", "Strategic Account Management", "Sales Ops"],
      Executive: ["CRO Assessment", "Global Sales Strategy", "Executive Leadership"]
  },
  "HR Director": {
      Entry: ["HR Fundamentals", "Employee Relations", "Recruitment Basics"],
      Mid: ["HR Strategy", "Talent Management", "Organizational Development"],
      Senior: ["Strategic HR Leadership", "Change Management", "Executive Communication"],
      Executive: ["CHRO Readiness", "Enterprise HR Strategy", "Culture Transformation"]
  },
  "Finance Manager": {
      Entry: ["Financial Analysis", "Accounting Principles", "Basic Forecasting"],
      Mid: ["Advanced Financial Planning", "Risk Management", "Team Leadership"],
      Senior: ["Strategic Finance Leadership", "M&A Assessment", "Executive Presence"],
      Executive: ["CFO Readiness", "Enterprise Finance Strategy", "Board Communication"]
  }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const roleSelect = document.getElementById('roleSelect');
  const experienceSelect = document.getElementById('experienceSelect');
  const searchInput = document.getElementById('searchInput');
  const recommendButton = document.getElementById('recommendButton');
  const resultsSection = document.getElementById('resultsSection');
  const assessmentCards = document.getElementById('assessmentCards');

  // Populate role select with options
  populateRoleSelect();

  // Event listeners
  searchInput.addEventListener('input', handleSearch);
  roleSelect.addEventListener('change', handleSelectionChange);
  experienceSelect.addEventListener('change', handleSelectionChange);
  recommendButton.addEventListener('click', showRecommendations);

  // Initialize select2-like search functionality
  let searchTimeout;
  function handleSearch(e) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
          const searchTerm = e.target.value.toLowerCase();
          const filteredRoles = Object.keys(assessments).filter(role =>
              role.toLowerCase().includes(searchTerm)
          );
          
          // Clear and repopulate role select
          roleSelect.innerHTML = '<option value="">Select a role</option>';
          filteredRoles.forEach(role => {
              const option = document.createElement('option');
              option.value = role;
              option.textContent = role;
              roleSelect.appendChild(option);
          });
      }, 300);
  }

  function handleSelectionChange() {
      const isValid = roleSelect.value && experienceSelect.value;
      recommendButton.disabled = !isValid;
      
      if (isValid) {
          recommendButton.classList.add('active');
      } else {
          recommendButton.classList.remove('active');
      }
  }

  function populateRoleSelect() {
      Object.keys(assessments).forEach(role => {
          const option = document.createElement('option');
          option.value = role;
          option.textContent = role;
          roleSelect.appendChild(option);
      });
  }

  function showRecommendations() {
      const selectedRole = roleSelect.value;
      const selectedExperience = experienceSelect.value;

      if (!selectedRole || !selectedExperience) return;

      const recommendedAssessments = assessments[selectedRole][selectedExperience];
      
      // Clear previous results
      assessmentCards.innerHTML = '';

      // Create assessment cards
      recommendedAssessments.forEach(assessment => {
          const card = document.createElement('div');
          card.className = 'assessment-card';
          card.innerHTML = `
              <h3>${assessment}</h3>
              <p>Recommended for ${selectedRole} - ${selectedExperience} Level</p>
          `;
          assessmentCards.appendChild(card);
      });

      // Show results section with animation
      resultsSection.classList.remove('hidden');
      resultsSection.style.opacity = '0';
      resultsSection.style.transform = 'translateY(20px)';
      
      // Trigger animation
      requestAnimationFrame(() => {
          resultsSection.style.transition = 'all 0.5s ease';
          resultsSection.style.opacity = '1';
          resultsSection.style.transform = 'translateY(0)';
      });
  }
});