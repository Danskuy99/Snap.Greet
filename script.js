document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const openSidebarBtn = document.getElementById('openSidebar');
  const closeSidebarBtn = document.getElementById('closeSidebar');

  const searchInput = document.getElementById('searchInput');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const filterMenuBtns = document.querySelectorAll('.filter-btn');
  const cardItems = document.querySelectorAll('.card-item');
  const noResult = document.getElementById('noResult');
  const totalTemplateCount = document.getElementById('totalTemplateCount');

  // Menu Navigasi Utama Sidebar
  const menuSemuaLayanan = document.getElementById('menuSemuaLayanan');
  const menuInfoJasa = document.getElementById('menuInfoJasa');
  const katalogGrid = document.getElementById('katalog');
  const filterSection = document.querySelector('.filter-section');
  const infoJasaSection = document.getElementById('infoJasaSection');

  const modal = document.getElementById('demoModal');
  const closeModalBtn = document.getElementById('closeModal');
  const demoIframe = document.getElementById('demoIframe');
  const demoImage = document.getElementById('demoImage');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');
  const modalTitle = document.getElementById('modalTitle');
  const demoButtons = document.querySelectorAll('.btn-demo');

  let currentCategory = 'all';

  // Toggle Sidebar Mobile
  const openSidebar = () => {
    sidebar.classList.add('open');
    sidebarOverlay.style.display = 'block';
  };

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    sidebarOverlay.style.display = 'none';
  };

  if (openSidebarBtn) openSidebarBtn.addEventListener('click', openSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // Navigasi Menu Utama Sidebar (Semua Layanan vs Info Jasa)
  if (menuInfoJasa) {
    menuInfoJasa.addEventListener('click', (e) => {
      e.preventDefault();
      
      katalogGrid.classList.add('hidden');
      filterSection.classList.add('hidden');
      infoJasaSection.classList.remove('hidden');
      noResult.classList.add('hidden');
      
      menuSemuaLayanan.classList.remove('active');
      menuInfoJasa.classList.add('active');
      closeSidebar();
    });
  }

  if (menuSemuaLayanan) {
    menuSemuaLayanan.addEventListener('click', (e) => {
      e.preventDefault();
      
      katalogGrid.classList.remove('hidden');
      filterSection.classList.remove('hidden');
      infoJasaSection.classList.add('hidden');
      
      menuInfoJasa.classList.remove('active');
      menuSemuaLayanan.classList.add('active');
      
      filterTemplates();
      closeSidebar();
    });
  }

  // Filter & Search Functionality
  const filterTemplates = () => {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    cardItems.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.getAttribute('data-title');
      const matchCategory = currentCategory === 'all' || category === currentCategory;
      const matchSearch = title.includes(query);

      if (matchCategory && matchSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (visibleCount === 0) {
      noResult.classList.remove('hidden');
    } else {
      noResult.classList.add('hidden');
    }

    if (totalTemplateCount) {
      totalTemplateCount.textContent = `${visibleCount} Pilihan`;
    }
  };

  const setActiveCategory = (category) => {
    currentCategory = category;

    // Pastikan kembali ke Tampilan Katalog jika sebelumnya di Info Jasa
    katalogGrid.classList.remove('hidden');
    filterSection.classList.remove('hidden');
    infoJasaSection.classList.add('hidden');
    menuInfoJasa.classList.remove('active');
    menuSemuaLayanan.classList.add('active');

    tabButtons.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-category') === category);
    });

    filterMenuBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === category);
    });

    filterTemplates();
  };

  tabButtons.forEach(tab => {
    tab.addEventListener('click', () => setActiveCategory(tab.getAttribute('data-category')));
  });

  filterMenuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveCategory(btn.getAttribute('data-category'));
      closeSidebar();
    });
  });

  if (searchInput) searchInput.addEventListener('input', filterTemplates);

  // Modal Preview Demo Logic
  demoButtons.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.getAttribute('data-type');

      if (type === 'html') {
        const demoUrl = button.getAttribute('data-src');
        if (demoUrl) {
          demoIframe.src = demoUrl;
          demoIframe.classList.remove('hidden');
          imagePreviewContainer.classList.add('hidden');
          modalTitle.innerHTML = '<i class="fa-solid fa-desktop mr-2"></i> Preview Template Ucapan';
          modal.style.display = 'flex';
        }
      } else if (type === 'image') {
        const imgUrl = button.getAttribute('data-img');
        if (imgUrl) {
          demoImage.src = imgUrl;
          imagePreviewContainer.classList.remove('hidden');
          demoIframe.classList.add('hidden');
          modalTitle.innerHTML = '<i class="fa-solid fa-image mr-2"></i> Sampel Hasil Generate Photo AI';
          modal.style.display = 'flex';
        }
      }
    });
  });

  const hideModal = () => {
    modal.style.display = 'none';
    demoIframe.src = '';
    demoImage.src = '';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });
});