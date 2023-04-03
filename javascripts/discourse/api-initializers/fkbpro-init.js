import { withPluginApi } from 'discourse/lib/plugin-api';
import { findRawTemplate } from 'discourse-common/lib/raw-templates';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';

export default {
  name: 'fkbpro',
  initialize() {
    withPluginApi('0.8.7', (api) => {
      console.log('heeeeee');
      var divEl = document.createElement('div');

      // Use same template on Desktop and MobileView
      api.modifyClass('component:topic-list-item', {
        pluginId: 'FKB-pro',

        renderTopicListItem() {
          const template = findRawTemplate('list/custom-topic-list-item');
          if (template) {
            this.set('topicListItemContents', htmlSafe(template(this)));
          }
        },
      });

      ////////
console.log('heeeeee2');
      
      
       function whereToReturn() {
              // first option, using parameters if they exist
              if (localStorage.getItem('full_community_path')) {
                if (
                  localStorage
                    .getItem('full_community_path')
                    .includes('courses')
                ) {
                  text = 'Back to Curriculum';
                }
                return localStorage.getItem('full_community_path');
              }
              // second option 'document referrer'
              if (
                document.referrer ||
                localStorage.getItem('full_community_path')
              ) {
                if (document.referrer) {
                  localStorage.setItem(
                    'full_community_path',
                    document.referrer
                  );
                }
                text = 'Back to School';
                return document.referrer;
              } else {
                // fallback as i dont think we will support custom domains for beta
                return window.location.origin.replace('.community', '');
              }
            }
      
      
      window.addEventListener('load', function () {
        var test;
        setTimeout(function(){ // Force to wait until navigation has been loaded
              console.log('dsad');
                document.querySelector('.btn-sidebar-toggle');
            }, 0);
        
        console.log('heeeeee3', test);
        if (document.querySelector('.sidebar-sections')) {
          let text = 'Back to School';

            var locationString = whereToReturn();
            divEl.className = 'link-wrapper';
            divEl.innerHTML = `
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.66602 6.0625C0.801432 6.0625 0.103516 6.70458 0.103516 7.5C0.103516 8.29542 0.801432 8.9375 1.66602 8.9375C2.5306 8.9375 3.22852 8.29542 3.22852 7.5C3.22852 6.70458 2.5306 6.0625 1.66602 6.0625ZM1.66602 0.3125C0.801432 0.3125 0.103516 0.954583 0.103516 1.75C0.103516 2.54542 0.801432 3.1875 1.66602 3.1875C2.5306 3.1875 3.22852 2.54542 3.22852 1.75C3.22852 0.954583 2.5306 0.3125 1.66602 0.3125ZM1.66602 11.8125C0.801432 11.8125 0.103516 12.4642 0.103516 13.25C0.103516 14.0358 0.811849 14.6875 1.66602 14.6875C2.52018 14.6875 3.22852 14.0358 3.22852 13.25C3.22852 12.4642 2.5306 11.8125 1.66602 11.8125ZM4.79102 14.2083H19.3744V12.2917H4.79102V14.2083ZM4.79102 8.45833H19.3744V6.54167H4.79102V8.45833ZM4.79102 0.791667V2.70833H19.3744V0.791667H4.79102Z" fill="#222222"/>
</svg>
    <a class="text" href=${locationString} title=${text}>${text}
    </a>
`;
          document.querySelector('.sidebar-sections').prepend(divEl);
        }
        if (test) {
          console.log('heeeeee4');
          test.addEventListener('click', function () {
            console.log('heeeeee5');
            // tested code
            const queryString = window.location.search;
            const queryParams = new URLSearchParams(queryString);
            const communityReferrerUrl = queryParams.get('url');
            const communityReferrerPath = queryParams.get('path');
            if (communityReferrerUrl && communityReferrerPath) {
              localStorage.setItem(
                'full_community_path',
                window.location.protocol +
                  '//' +
                  communityReferrerUrl +
                  communityReferrerPath
              );
            }

            
            console.log('final');
            
            if (document.querySelector('.sidebar-sections')) {
          let text = 'Back to School';
            console.log('hereeee');
              var divEl = document.createElement('div');
            var locationString = whereToReturn();
            divEl.className = 'link-wrapper';
            divEl.innerHTML = `
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.66602 6.0625C0.801432 6.0625 0.103516 6.70458 0.103516 7.5C0.103516 8.29542 0.801432 8.9375 1.66602 8.9375C2.5306 8.9375 3.22852 8.29542 3.22852 7.5C3.22852 6.70458 2.5306 6.0625 1.66602 6.0625ZM1.66602 0.3125C0.801432 0.3125 0.103516 0.954583 0.103516 1.75C0.103516 2.54542 0.801432 3.1875 1.66602 3.1875C2.5306 3.1875 3.22852 2.54542 3.22852 1.75C3.22852 0.954583 2.5306 0.3125 1.66602 0.3125ZM1.66602 11.8125C0.801432 11.8125 0.103516 12.4642 0.103516 13.25C0.103516 14.0358 0.811849 14.6875 1.66602 14.6875C2.52018 14.6875 3.22852 14.0358 3.22852 13.25C3.22852 12.4642 2.5306 11.8125 1.66602 11.8125ZM4.79102 14.2083H19.3744V12.2917H4.79102V14.2083ZM4.79102 8.45833H19.3744V6.54167H4.79102V8.45833ZM4.79102 0.791667V2.70833H19.3744V0.791667H4.79102Z" fill="#222222"/>
</svg>
    <a class="text" href=${locationString} title=${text}>${text}
    </a>
`;
          document.querySelector('.sidebar-sections').prepend(divEl);
        }
            // tested code
          });
        }
      });
      ////////

      api.onAppEvent('sidebar-hamburger-dropdown:rendered', () => {
        console.log('hamburguer');
      });

      api.onAppEvent('user-menu:navigation', () => {
        console.log('user menu navigation');
      });

      api.onAppEvent('user-menu:rendered', () => {
        console.log('user menu navigation');
      });

      ///////
      // Sticky New Topic Banner Latest
      api.modifyClass('controller:discovery/topics', {
        pluginId: 'sticky-new-topics-banner',
        @action
        showInserted(event) {
          event?.preventDefault();
          const tracker = this.topicTrackingState;

          const listControls = document.querySelector('.list-controls');
          listControls.scrollIntoView();

          // Move inserted into topics
          this.model.loadBefore(tracker.get('newIncoming'), true);
          tracker.resetTracking();
        },
      });
      api.addNavigationBarItem({
        name: 'cesar item',
        displayName: 'cesar item',
        href: 'https://www.discourse.org',
      });
      // Sticky New Topic Banner Category
      api.modifyClass('controller:discovery/categories', {
        pluginId: 'sticky-new-topics-banner',
        @action
        showInserted(event) {
          event?.preventDefault();
          const tracker = this.topicTrackingState;

          const listControls = document.querySelector('.list-controls');
          listControls.scrollIntoView();

          // Move inserted into topics
          this.model.loadBefore(tracker.get('newIncoming'), true);
          tracker.resetTracking();
        },
      });
      // Sticky New Topic Banner Tag
      api.modifyClass('controller:tag-show', {
        pluginId: 'sticky-new-topics-banner',
        @action
        showInserted(event) {
          event?.preventDefault();
          const tracker = this.topicTrackingState;

          const listControls = document.querySelector('.list-controls');
          listControls.scrollIntoView();

          this.list.loadBefore(tracker.newIncoming, true);
          tracker.resetTracking();
          return false;
        },
      });

      // Sticky New Topic Banner PM
      api.modifyClass('controller:user-topics-list', {
        pluginId: 'sticky-new-topics-banner',
        @action
        showInserted(event) {
          event?.preventDefault();
          this.model.loadBefore(this.pmTopicTrackingState.newIncoming);
          this.pmTopicTrackingState.resetIncomingTracking();

          const userNavigation = document.querySelector(
            '.user-primary-navigation'
          );
          userNavigation.scrollIntoView();
        },
      });
    });
  },
};
