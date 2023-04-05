import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'discourse-navigation-controls',

  initialize() {
    const svgIcon = (locationString, text) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
<path d="M17.3327 7.54036H4.6556L10.4785 2.18328L8.99935 0.832031L0.666016 8.4987L8.99935 16.1654L10.4681 14.8141L4.6556 9.45703H17.3327V7.54036Z" fill="#222222"/>
</svg>
      <a class="text" href=${locationString} title=${text}>${text}
      </a>
  `;
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    const communityReferrerUrl = queryParams.get('url');
    const communityReferrerPath = queryParams.get('path');
    if (communityReferrerUrl && communityReferrerPath) {
      localStorage.setItem(
        'full_community_path',
        window.location.protocol + '//' + communityReferrerUrl + communityReferrerPath
      );
    }

    let text = 'Back to School';
    function whereToReturn() {
      // first option, using parameters if they exist
      if (localStorage.getItem('full_community_path')) {
        if (localStorage.getItem('full_community_path').includes('courses')) {
          text = 'Back to Curriculum';
        }
        return localStorage.getItem('full_community_path');
      }
      // second option 'document referrer'
      if (document.referrer || localStorage.getItem('full_community_path')) {
        if (document.referrer) {
          localStorage.setItem('full_community_path', document.referrer);
        }
        text = 'Back to School';
        return document.referrer;
      } else {
        // fallback as i dont think we will support custom domains for beta
        return window.location.origin.replace('.community', '');
      }
    }

    var locationString = whereToReturn();
    var divEl = document.createElement('div');
    divEl.className = 'link-wrapper';
    divEl.innerHTML = svgIcon(locationString, text);
    window.addEventListener('load', () => {
      if (document.querySelector('.sidebar-sections')) {
        document.querySelector('.sidebar-sections').prepend(divEl);
      }
      const testElement = document.querySelector('.header-sidebar-toggle')
      if(!testElement) return
      testElement.addEventListener('click', function(){
        var locationString = whereToReturn();
        var divEl = document.createElement('div');
        divEl.className = 'link-wrapper';
        divEl.innerHTML = svgIcon(locationString, text)
    const timeOut = setTimeout(function(){
        if(document.querySelector('.sidebar-sections')) {
            if(!document.querySelector('.link-wrapper')){
                document.querySelector('.sidebar-sections').prepend(divEl);
                clearTimeout(timeOut)
            }
          }
    }, 100)

      })
    });
    withPluginApi('0.8.13', (api) => {
      const site = api.container.lookup('site:main');
      if (!site.mobileView) return;

      let scrollTop = window.scrollY;
      const body = document.body;
      const scrollMax = 0;
      let lastScrollTop = 0;
      const hiddenNavClass = 'nav-controls-hidden';

      const add_class_on_scroll = () => body.classList.add(hiddenNavClass);
      const remove_class_on_scroll = () =>
        body.classList.remove(hiddenNavClass);

      window.addEventListener('scroll', function () {
        scrollTop = window.scrollY;
        if (
          lastScrollTop < scrollTop &&
          scrollTop > scrollMax &&
          !body.classList.contains(hiddenNavClass)
        ) {
          add_class_on_scroll();
        } else if (
          lastScrollTop > scrollTop &&
          body.classList.contains(hiddenNavClass)
        ) {
          remove_class_on_scroll();
        }
        lastScrollTop = scrollTop;
      });
    });
  },
};
