import { withPluginApi } from "discourse/lib/plugin-api";
import { findRawTemplate } from "discourse-common/lib/raw-templates";
import { htmlSafe } from "@ember/template";
import { action } from "@ember/object";

export default {
  name: "fkbpro",
  initialize() {
    withPluginApi("0.8.7", (api) => {
      
      console.log('heeeeee');
    
      // Use same template on Desktop and MobileView
      api.modifyClass("component:topic-list-item", {
        pluginId: "FKB-pro",

        renderTopicListItem() {
          const template = findRawTemplate("list/custom-topic-list-item");
          if (template) {
            this.set("topicListItemContents", htmlSafe(template(this)));
          }
        },
      });
      
      ////////
      
      window.addEventListener('load', function(){
        var test = document.querySelector('.btn-sidebar-toggle')
        window.addEventListener('click', function(){
          console.log('clicked')
          console.log('btn-sidebar-toggle');
          console.log('test', test)
        })
        test.addEventListener('click', function(){
          console.log('clicked test')
          console.log('btn-sidebar-toggles');
          console.log('test', test)
        })
      })
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
      api.modifyClass("controller:discovery/topics", {
        pluginId: "sticky-new-topics-banner",
        @action
        showInserted(event) {
          event?.preventDefault();
          const tracker = this.topicTrackingState;
        
          const listControls = document.querySelector(".list-controls");
          listControls.scrollIntoView();

          // Move inserted into topics
          this.model.loadBefore(tracker.get("newIncoming"), true);
          tracker.resetTracking();
        }
      }); 
    api.addNavigationBarItem({
       name: "cesar item",
        displayName: "cesar item",
        href: "https://www.discourse.org",
      })
      // Sticky New Topic Banner Category
      api.modifyClass("controller:discovery/categories", {
        pluginId: "sticky-new-topics-banner",
        @action
        showInserted(event) {
          event?.preventDefault();
          const tracker = this.topicTrackingState;
        
          const listControls = document.querySelector(".list-controls");
          listControls.scrollIntoView();

          // Move inserted into topics
          this.model.loadBefore(tracker.get("newIncoming"), true);
          tracker.resetTracking();
        }
      });
      // Sticky New Topic Banner Tag
      api.modifyClass("controller:tag-show", {
        pluginId: "sticky-new-topics-banner",
        @action
        showInserted(event) {
          event?.preventDefault();
          const tracker = this.topicTrackingState;
        
          const listControls = document.querySelector(".list-controls");
          listControls.scrollIntoView();

          this.list.loadBefore(tracker.newIncoming, true);
          tracker.resetTracking();
          return false;
        }
      });
      
      // Sticky New Topic Banner PM
      api.modifyClass("controller:user-topics-list", {
        pluginId: "sticky-new-topics-banner",
        @action
        showInserted(event) {
          event?.preventDefault();
          this.model.loadBefore(this.pmTopicTrackingState.newIncoming);
          this.pmTopicTrackingState.resetIncomingTracking();
        
          const userNavigation = document.querySelector(".user-primary-navigation");
          userNavigation.scrollIntoView();
        }
      }); 
    });
  },
};
