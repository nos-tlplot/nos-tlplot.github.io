  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-arrow.prev');
  const nextButton = document.querySelector('.carousel-arrow.next');

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.setAttribute('aria-hidden', 'true');
  lastClone.setAttribute('aria-hidden', 'true');
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let index = 1;
  let timer = null;

  function setTransform(animate) {
    track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  track.addEventListener('transitionend', () => {
    if (index === 0) {
      index = slides.length;
      setTransform(false);
    } else if (index === slides.length + 1) {
      index = 1;
      setTransform(false);
    }
  });

  function moveCarousel(direction) {
    if (index === 0) {
      index = slides.length;
      setTransform(false);
    } else if (index === slides.length + 1) {
      index = 1;
      setTransform(false);
    }
    index = direction === 'next' ? index + 1 : index - 1;
    setTransform(true);
    restartTimer();
  }

  function startTimer() {
    if (!timer) timer = setInterval(() => moveCarousel('next'), 8000);
  }
  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }
  function restartTimer() {
    stopTimer();
    startTimer();
  }

  prevButton.addEventListener('click', () => moveCarousel('prev'));
  nextButton.addEventListener('click', () => moveCarousel('next'));
  document.querySelector('.carousel').addEventListener('mouseenter', stopTimer);
  document.querySelector('.carousel').addEventListener('mouseleave', startTimer);

  setTransform(false);
  startTimer();

  const citations = {
    apa: "Sahu, V. (2026). NOS-TLPlot: A Specialized Python Tool for Visualizing Newcastle–Ottawa Scale Risk-of-Bias Assessments. Journal of Open Research Software, 14(1), 7. https://doi.org/10.5334/jors.635",
    vancouver: "Sahu V. NOS-TLPlot: a specialized python tool for visualizing newcastle–ottawa scale risk-of-bias assessments. J Open Res Softw. 2026;14(1):7. doi:10.5334/jors.635",
    chicago: "Sahu, Vihaan. 2026. \"NOS-TLPlot: A Specialized Python Tool for Visualizing Newcastle–Ottawa Scale Risk-of-Bias Assessments.\" Journal of Open Research Software 14 (1): 7. https://doi.org/10.5334/jors.635.",
    harvard: "Sahu, V., 2026. ‘NOS-TLPlot: A Specialized Python Tool for Visualizing Newcastle–Ottawa Scale Risk-of-Bias Assessments’, Journal of Open Research Software, 14(1), p. 7. doi:10.5334/jors.635.",
    mla: "Sahu, Vihaan. \"NOS-TLPlot: A Specialized Python Tool for Visualizing Newcastle–Ottawa Scale Risk-of-Bias Assessments.\" Journal of Open Research Software, vol. 14, no. 1, 2026, p. 7. Crossref, https://doi.org/10.5334/jors.635.",
    ieee: "V. Sahu, \"NOS-TLPlot: A Specialized Python Tool for Visualizing Newcastle–Ottawa Scale Risk-of-Bias Assessments,\" Journal of Open Research Software, vol. 14, no. 1, p. 7, 2026."
  };

  const citationSelect = document.getElementById("citationType");
  const citationText = document.getElementById("citationText");

  citationSelect.addEventListener("change", () => {
    const selected = citationSelect.value;
    citationText.innerHTML = "<em>" + citations[selected] + "</em>";
  });

  function copyCitation() {
    const text = citationText.innerText;
    const showCopied = () => {
      const copyBtn = document.querySelector('.citation-select-container button');
      const notification = document.createElement('div');
      notification.className = 'citation-copied';
      notification.textContent = "Citation copied to clipboard!";
      copyBtn.appendChild(notification);
      requestAnimationFrame(() => notification.classList.add('show'));
      setTimeout(() => {
        notification.classList.remove('show');
      }, 2500);
      setTimeout(() => {
        notification.remove();
      }, 2900);
    };
    const fallbackCopy = () => {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      try {
        document.execCommand('copy');
      } catch (err) {}
      document.body.removeChild(helper);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(showCopied).catch(() => {
        fallbackCopy();
        showCopied();
      });
    } else {
      fallbackCopy();
      showCopied();
    }
  }
  

  function downloadCitation(format) {
    let content = "";
    let filename = "nos-tlplot_citation";
    
    if (format === 'ris') {
      content = `TY  - JOUR
T1  - NOS-TLPlot: A Specialized Python Tool for Visualizing Newcastle–Ottawa Scale Risk-of-Bias Assessments
A1  - Sahu, Vihaan
Y1  - 2026
JO  - Journal of Open Research Software
VL  - 14
IS  - 1
SP  - 7
DO  - 10.5334/jors.635
ER  - `;
      filename += ".ris";
    } else if (format === 'bibtex') {
      content = `@article{sahu2026nos,
  author = {Sahu, Vihaan},
  title = {NOS-TLPlot: A Specialized Python Tool for Visualizing Newcastle--Ottawa Scale Risk-of-Bias Assessments},
  journal = {Journal of Open Research Software},
  year = {2026},
  volume = {14},
  number = {1},
  pages = {7},
  doi = {10.5334/jors.635}
}`;
      filename += ".bib";
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }