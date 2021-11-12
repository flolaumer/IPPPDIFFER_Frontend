const ContentPanelService = {
  setTopMargin(elemToChange, marginTop) {
    if (marginTop > 0) {
      if (elemToChange) {
        // set margin top to content panel so that can be visible
        elemToChange.style.marginTop = `${marginTop}px`;
      }
    } else {
      if (elemToChange) {
        elemToChange.style.marginTop = `${marginTop}px`;
      }
    }
  },
  
  /**
   * @name setContentPanelPosition
   * @description Set margin top to content panel based on scroll position.
   */
  setContentPanelPosition(marginTop, contentPanelId) {
    if (window.innerWidth > 899) {
    
      setTimeout(() => {
        // get content panel by id
        const elemToChange = document.getElementById(contentPanelId);
  
        this.setTopMargin(elemToChange, marginTop);
        
      }, 800);
    }
  }
  
}

export default ContentPanelService;