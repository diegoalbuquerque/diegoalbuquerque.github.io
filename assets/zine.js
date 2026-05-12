(() => {
  const rows = Array.from(document.querySelectorAll('.article-row'));
  const input = document.getElementById('articleSearch');
  const clear = document.getElementById('clearFilters');
  const filterButtons = Array.from(document.querySelectorAll('[data-tag], [data-year]'));
  let selected = 0;
  let activeTag = '';
  let activeYear = '';

  function visibleRows() { return rows.filter(row => row.style.display !== 'none'); }

  function select(index) {
    const visible = visibleRows();
    rows.forEach(row => row.classList.remove('is-selected'));
    if (!visible.length) return;
    selected = (index + visible.length) % visible.length;
    visible[selected].classList.add('is-selected');
  }

  function applyFilter() {
    const q = (input?.value || '').toLowerCase().trim();
    rows.forEach(row => {
      const hay = `${row.textContent} ${row.dataset.title || ''} ${row.dataset.tags || ''} ${row.dataset.year || ''}`.toLowerCase();
      const okQ = !q || hay.includes(q);
      const okTag = !activeTag || (`${row.dataset.tags || ''}`).split(',').includes(activeTag);
      const okYear = !activeYear || row.dataset.year === activeYear;
      row.style.display = (okQ && okTag && okYear) ? '' : 'none';
    });
    select(0);
  }

  input?.addEventListener('input', applyFilter);
  clear?.addEventListener('click', () => {
    if (input) input.value = '';
    activeTag = '';
    activeYear = '';
    filterButtons.forEach(btn => btn.classList.remove('is-active'));
    applyFilter();
    input?.focus();
  });

  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.tag) activeTag = activeTag === btn.dataset.tag ? '' : btn.dataset.tag;
    if (btn.dataset.year) activeYear = activeYear === btn.dataset.year ? '' : btn.dataset.year;
    filterButtons.forEach(b => b.classList.toggle('is-active', b.dataset.tag === activeTag || b.dataset.year === activeYear));
    applyFilter();
  }));

  document.addEventListener('keydown', ev => {
    if (ev.target && ['INPUT', 'TEXTAREA'].includes(ev.target.tagName)) return;
    if (ev.key === '/') { ev.preventDefault(); input?.focus(); }
    if (ev.key === 'j') { ev.preventDefault(); select(selected + 1); }
    if (ev.key === 'k') { ev.preventDefault(); select(selected - 1); }
    if (ev.key === 'Enter') {
      const row = visibleRows()[selected];
      if (row) window.location.href = row.href;
    }
  });

  select(0);
})();
