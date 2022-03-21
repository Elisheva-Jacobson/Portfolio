class Navigator {
  sections = [];
  links = [];
  IDS = [];
  callbackArray;
  currentlyShowing;
  default;

  constructor(ids, startShowing, callbacks) {
    ids.forEach((id, index) => {
      this.IDS.push(id);
      const section = this.sections.push(document.getElementById(id));
      if (!this.sections[index]) {
        throw new Error(`Invalid id. No element was found with an id of ${id}`);
      }
      document.querySelectorAll(`a[href='#${id}']`)
        .forEach(link => this.links.push({ link: link, id: id }));
          });
      this.callbackArray = callbacks || [];
      if (startShowing) {
        if (!this.IDS.includes(startShowing)) {
          throw new Error(`Invalid starting display id. ${startShowing} is not in the array of ids.`);
        }
      }
      this.default = (startShowing === null || startShowing) ? startShowing : this.IDS[0];
      this.navigateTo(this.default);
      this.links.forEach(item => {
        item.link.addEventListener('click', () => this.navigateTo(item.id));
      });
      window.addEventListener('hashchange', this.hashConsistency);
      window.addEventListener('load', this.hashConsistency);
    }

  hashConsistency = () => {
    const newHash = window.location.hash.substring(1);
    if (newHash !== this.currentlyShowing) {
      if (this.IDS.includes(newHash)) {
        this.navigateTo(newHash);
      } else if (newHash === '') {
        this.navigateTo(this.default);
      } else {
        for (let i = 0; i < this.IDS.length; i++) {
          if (document.querySelector(`#${this.IDS[i]} #${newHash}`) !== null) {
            this.navigateTo(this.IDS[i]);
            break;
          }
        }
      }
    }
  }

  navigateTo(displayId) {
    if (displayId !== null) {
      const sectionIndex = this.IDS.findIndex(id => id === displayId);
      this.hideSections(sectionIndex);
      if (this.callbackArray[sectionIndex]) {
        this.callbackArray[sectionIndex]();
      }
    } else {
      this.hideSections(displayId);
    }
  }

  hideSections(displayIndex) {
    this.sections.forEach((section, index) => {
      if (index !== displayIndex) {
        section.style.display = 'none';
      }
    });
    if (displayIndex !== null) {
      this.sections[displayIndex].style.display = 'block';
      this.currentlyShowing = this.IDS[displayIndex];
    } else {
      this.currentlyShowing = null;
    }
  }
}

export default function navigate(ids, startShowing, callbacks) {
  new Navigator(ids, startShowing, callbacks);
}