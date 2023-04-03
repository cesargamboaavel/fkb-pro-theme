import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'discourse-navigation-controls',

  initialize() {
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
    divEl.innerHTML = `
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.66602 6.0625C0.801432 6.0625 0.103516 6.70458 0.103516 7.5C0.103516 8.29542 0.801432 8.9375 1.66602 8.9375C2.5306 8.9375 3.22852 8.29542 3.22852 7.5C3.22852 6.70458 2.5306 6.0625 1.66602 6.0625ZM1.66602 0.3125C0.801432 0.3125 0.103516 0.954583 0.103516 1.75C0.103516 2.54542 0.801432 3.1875 1.66602 3.1875C2.5306 3.1875 3.22852 2.54542 3.22852 1.75C3.22852 0.954583 2.5306 0.3125 1.66602 0.3125ZM1.66602 11.8125C0.801432 11.8125 0.103516 12.4642 0.103516 13.25C0.103516 14.0358 0.811849 14.6875 1.66602 14.6875C2.52018 14.6875 3.22852 14.0358 3.22852 13.25C3.22852 12.4642 2.5306 11.8125 1.66602 11.8125ZM4.79102 14.2083H19.3744V12.2917H4.79102V14.2083ZM4.79102 8.45833H19.3744V6.54167H4.79102V8.45833ZM4.79102 0.791667V2.70833H19.3744V0.791667H4.79102Z" fill="#222222"/>
</svg>
    <a class="text" href=${locationString} title=${text}>${text}
    </a>
`;
    window.addEventListener('load', () => {
      if (document.querySelector('.sidebar-sections')) {
        document.querySelector('.sidebar-sections').prepend(divEl);
      }
      const testElement = document.querySelector('.header-sidebar-toggle')
      console.log('test element', testElement)
      if(!testElement) return
      testElement.addEventListener('click', function(){
        console.log('click');
        var locationString = whereToReturn();
        var divEl = document.createElement('div');
        divEl.className = 'link-wrapper';
        divEl.innerHTML = `
      <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.66602 6.0625C0.801432 6.0625 0.103516 6.70458 0.103516 7.5C0.103516 8.29542 0.801432 8.9375 1.66602 8.9375C2.5306 8.9375 3.22852 8.29542 3.22852 7.5C3.22852 6.70458 2.5306 6.0625 1.66602 6.0625ZM1.66602 0.3125C0.801432 0.3125 0.103516 0.954583 0.103516 1.75C0.103516 2.54542 0.801432 3.1875 1.66602 3.1875C2.5306 3.1875 3.22852 2.54542 3.22852 1.75C3.22852 0.954583 2.5306 0.3125 1.66602 0.3125ZM1.66602 11.8125C0.801432 11.8125 0.103516 12.4642 0.103516 13.25C0.103516 14.0358 0.811849 14.6875 1.66602 14.6875C2.52018 14.6875 3.22852 14.0358 3.22852 13.25C3.22852 12.4642 2.5306 11.8125 1.66602 11.8125ZM4.79102 14.2083H19.3744V12.2917H4.79102V14.2083ZM4.79102 8.45833H19.3744V6.54167H4.79102V8.45833ZM4.79102 0.791667V2.70833H19.3744V0.791667H4.79102Z" fill="#222222"/>
    </svg>
        <a class="text" href=${locationString} title=${text}>${text}
        </a>
    `;
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
