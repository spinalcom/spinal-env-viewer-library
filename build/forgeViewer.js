"use strict";

const SpinalViewer = require("./spinalViewer");

/**
 *
 *
 * @class ForgeViewer
 * @extends {SpinalViewer}
 */

var ForgeViewer = class ForgeViewer extends SpinalViewer {
  constructor(viewer) {
    super();
    this.viewer = viewer;
    this.externalIdMapping = {};
  }

  /**
   * This function takes as parameter an external_id (string) or a list of external_id and selects the item(s) corresponding to this/these external_id
   * @param {Array.<string>} externalIds
   */
  selectObject(externalIds) {
    var allPromise = [];

    if (!Array.isArray(externalIds)) externalIds = [externalIds];

    for (var i = 0; i < externalIds.length; i++) {
      allPromise.push(this.getDbIdByExternalId(externalIds[i]));
    }

    Promise.all(allPromise).then(listDbId => {
      this.viewer.select(listDbId);
    });
  }

  /**
   * function taking in parameter an externalId (string) and returning a Promise of corresponding dbId (number)
   * @param {string} externalId
   */
  getDbIdByExternalId(externalId) {
    return new Promise((resolve, reject) => {
      if (this.externalIdMapping[externalId]) {
        resolve(this.externalIdMapping[externalId]);
      } else {
        this.viewer.model.getExternalIdMapping(el => {
          var dbId = el[externalId];
          this.externalIdMapping[externalId] = dbId;
          resolve(dbId);
        }, () => {
          reject("No dbId associated at this externalId");
        });
      }
    });
  }

  /**
   * This function takes in parameter a dbId (number) and return the corresponding external id (string)
   * @param {int} dbId
   */
  getExternalIdByDbId(dbId) {
    return new Promise((resolve, reject) => {
      this.viewer.model.getProperties(dbId, itemProperties => {
        resolve(itemProperties.externalId);
      }, () => {
        reject("No external id associated at this dbId");
      });
    });
  }

  /**
   * function retrieving all selected items and returning a list of external_id
   */
  getselectedObject() {
    var itemsDbIds = this.viewer.getSelection();

    return new Promise((resolve, reject) => {
      var allPromise = [];
      if (itemsDbIds.length > 0) {
        for (var i = 0; i < itemsDbIds.length; i++) {
          console.log("externalId", itemsDbIds[i], this.getExternalIdByDbId(itemsDbIds[i]));
          allPromise.push(this.getExternalIdByDbId(itemsDbIds[i]));
        }

        Promise.all(allPromise).then(el => {
          resolve(el);
        });
      } else {
        reject("no Item Selected");
      }
    });
  }

  /**
   * This function takes in parameter an external_id (string) or a list of external_id and zoom the viewer on the corresponding elements
   * @param {Array.<string>} externalId
   */
  fitToView(externalId) {
    var allPromises = [];

    if (!Array.isArray(externalId)) externalId = [externalId];

    console.log(externalId);

    for (var i = 0; i < externalId.length; i++) {
      allPromises.push(this.getDbIdByExternalId(externalId[i]));
    }

    Promise.all(allPromises).then(ids => {
      console.log("ids", ids);
      this.viewer.fitToView(ids);
    });
  }

  /**
   *This function takes an external_id (string) or a list of external_id in parameter and display only the items corresponding to external_id
   * @param {Array.<string>} externalId
   */
  isolate(externalId) {
    var allPromises = [];

    if (!Array.isArray(externalId)) externalId = [externalId];

    console.log(externalId);

    for (var i = 0; i < externalId.length; i++) {
      allPromises.push(this.getDbIdByExternalId(externalId[i]));
    }

    Promise.all(allPromises).then(ids => {
      this.viewer.isolateById(ids);
    });
  }

  /**
   *This function takes 3 parameters, appId (the application's ID), externalId (the id of the coloring element) and color (color name or hexadecimal color). It colors the element(s) according to the color and the appId
   *
   * @param {string} appId
   * @param {Array.<string>} externalId
   * @param {string} color
   */
  colorObject(appId, externalId, color) {
    var allPromises = [];

    if (!Array.isArray(externalId)) externalId = [externalId];

    for (var i = 0; i < externalId.length; i++) {
      allPromises.push(this.getDbIdByExternalId(externalId[i]));
    }

    Promise.all(allPromises).then(ids => {
      this.viewer.setColorMaterial(ids, color, appId);
    });
  }

  /**
   * This function takes in parameter an appId and external_id/list of external_id. It restore the default color of the element(s) according to the appId
   * @param {String} appId
   * @param {Array.<string>} externalId
   */
  restoreColor(appId, externalId) {
    var allPromises = [];

    if (!Array.isArray(externalId)) externalId = [externalId];

    for (var i = 0; i < externalId.length; i++) {
      allPromises.push(this.getDbIdByExternalId(externalId[i]));
    }

    Promise.all(allPromises).then(el => {
      this.viewer.restoreColorMaterial(el, appId);
    });
  }

  /**
   * 
   * @param {number} rootId 
   * @param {function} callback
   */
  sweep(rootId = this.viewer.model.getRootId(), callback) {
    // var rootId = this.viewer.model.getRootId();

    return new Promise(resolve => {
      this.model.getData().instanceTree.enumNodeChildren(rootId, el => {
        if (el) {
          callback(el);
          this.sweep(el, callback).then(() => {
            resolve(false);
          });
        } else {
          resolve(false);
        }
      });
    });
  }

  /**
   * This Function returns the camera and it (camera) can be modified by the user
   */
  getCamera() {
    return new Promise((resolve, reject) => {
      resolve(this.viewer.getCamera());
    });
  }

  /**
   *
   */
  setCamera() {}

  /**
   * returns a promise of a list of active cut Planes
   */
  getCutPlanes() {
    return new Promise((resolve, reject) => {
      resolve(this.viewer.getCutPlanes());
    });
  }

  /**
   *
   */
  setCutPlanes() {}

  /**
   *
   */
  resgisterEvent() {}

  /**
   * 
   * this function creates a panel in the viewer, it takes as parameters the panelTitle(string), the panel width(number in percent, default value is 40), the panel height (number in percent, default value is 80) and the vertical position of the panel : top(number in px, default value is 0px) 
   * 
   * @param {string} panelTitle 
   * @param {number} width 
   * @param {number} height 
   * @param {number} top 
   */
  createPanel(panelTitle, width = 40, height = 80, top = 0) {
    var panel = new PanelClass(this.viewer, panelTitle);
    panel.container.style.top = top + "px";
    panel.container.style.width = width + "%";
    panel.container.style.height = height + "%";

    var div = document.createElement('div');
    div.className = panel.container.id + panelTitle;
    div.style.width = "100%";
    div.style.height = "calc(100% - 55px)";
    div.style.overflowY = "auto";

    panel.container.appendChild(div);

    return panel;
  }

  /**
   * This function takes in params an externalId(string) and returns item properties
   * @param {string} externalId 
   */
  getProps(externalId) {

    return new Promise((resolve, reject) => {
      this.getDbIdByExternalId(externalId).then(el => {
        this.viewer.model.getProperties(el, itemProperties => {
          resolve(itemProperties);
        }, () => {
          reject("No Item found");
        });
      });
    });
  }

};
module.exports = ForgeViewer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JnZVZpZXdlci5qcyJdLCJuYW1lcyI6WyJTcGluYWxWaWV3ZXIiLCJyZXF1aXJlIiwiRm9yZ2VWaWV3ZXIiLCJjb25zdHJ1Y3RvciIsInZpZXdlciIsImV4dGVybmFsSWRNYXBwaW5nIiwic2VsZWN0T2JqZWN0IiwiZXh0ZXJuYWxJZHMiLCJhbGxQcm9taXNlIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXREYklkQnlFeHRlcm5hbElkIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJsaXN0RGJJZCIsInNlbGVjdCIsImV4dGVybmFsSWQiLCJyZXNvbHZlIiwicmVqZWN0IiwibW9kZWwiLCJnZXRFeHRlcm5hbElkTWFwcGluZyIsImVsIiwiZGJJZCIsImdldEV4dGVybmFsSWRCeURiSWQiLCJnZXRQcm9wZXJ0aWVzIiwiaXRlbVByb3BlcnRpZXMiLCJnZXRzZWxlY3RlZE9iamVjdCIsIml0ZW1zRGJJZHMiLCJnZXRTZWxlY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiZml0VG9WaWV3IiwiYWxsUHJvbWlzZXMiLCJpZHMiLCJpc29sYXRlIiwiaXNvbGF0ZUJ5SWQiLCJjb2xvck9iamVjdCIsImFwcElkIiwiY29sb3IiLCJzZXRDb2xvck1hdGVyaWFsIiwicmVzdG9yZUNvbG9yIiwicmVzdG9yZUNvbG9yTWF0ZXJpYWwiLCJzd2VlcCIsInJvb3RJZCIsImdldFJvb3RJZCIsImNhbGxiYWNrIiwiZ2V0RGF0YSIsImluc3RhbmNlVHJlZSIsImVudW1Ob2RlQ2hpbGRyZW4iLCJnZXRDYW1lcmEiLCJzZXRDYW1lcmEiLCJnZXRDdXRQbGFuZXMiLCJzZXRDdXRQbGFuZXMiLCJyZXNnaXN0ZXJFdmVudCIsImNyZWF0ZVBhbmVsIiwicGFuZWxUaXRsZSIsIndpZHRoIiwiaGVpZ2h0IiwidG9wIiwicGFuZWwiLCJQYW5lbENsYXNzIiwiY29udGFpbmVyIiwic3R5bGUiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpZCIsIm92ZXJmbG93WSIsImFwcGVuZENoaWxkIiwiZ2V0UHJvcHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU1BLGVBQWVDLFFBQVEsZ0JBQVIsQ0FBckI7O0FBR0E7Ozs7Ozs7QUFPQSxJQUFJQyxjQUFjLE1BQU1BLFdBQU4sU0FBMEJGLFlBQTFCLENBQXVDO0FBQ3ZERyxjQUFZQyxNQUFaLEVBQW9CO0FBQ2xCO0FBQ0EsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUIsRUFBekI7QUFDRDs7QUFFRDs7OztBQUlBQyxlQUFhQyxXQUFiLEVBQTBCO0FBQ3hCLFFBQUlDLGFBQWEsRUFBakI7O0FBRUEsUUFBSSxDQUFDQyxNQUFNQyxPQUFOLENBQWNILFdBQWQsQ0FBTCxFQUFpQ0EsY0FBYyxDQUFDQSxXQUFELENBQWQ7O0FBRWpDLFNBQUssSUFBSUksSUFBSSxDQUFiLEVBQWdCQSxJQUFJSixZQUFZSyxNQUFoQyxFQUF3Q0QsR0FBeEMsRUFBNkM7QUFDM0NILGlCQUFXSyxJQUFYLENBQWdCLEtBQUtDLG1CQUFMLENBQXlCUCxZQUFZSSxDQUFaLENBQXpCLENBQWhCO0FBQ0Q7O0FBRURJLFlBQVFDLEdBQVIsQ0FBWVIsVUFBWixFQUF3QlMsSUFBeEIsQ0FBNkJDLFlBQVk7QUFDdkMsV0FBS2QsTUFBTCxDQUFZZSxNQUFaLENBQW1CRCxRQUFuQjtBQUNELEtBRkQ7QUFHRDs7QUFFRDs7OztBQUlBSixzQkFBb0JNLFVBQXBCLEVBQWdDO0FBQzlCLFdBQU8sSUFBSUwsT0FBSixDQUFZLENBQUNNLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN0QyxVQUFJLEtBQUtqQixpQkFBTCxDQUF1QmUsVUFBdkIsQ0FBSixFQUF3QztBQUN0Q0MsZ0JBQVEsS0FBS2hCLGlCQUFMLENBQXVCZSxVQUF2QixDQUFSO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS2hCLE1BQUwsQ0FBWW1CLEtBQVosQ0FBa0JDLG9CQUFsQixDQUNFQyxN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ZmlsZSI6ImZvcmdlVmlld2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3BpbmFsVmlld2VyID0gcmVxdWlyZShcIi4vc3BpbmFsVmlld2VyXCIpO1xuXG5cbi8qKlxuICpcbiAqXG4gKiBAY2xhc3MgRm9yZ2VWaWV3ZXJcbiAqIEBleHRlbmRzIHtTcGluYWxWaWV3ZXJ9XG4gKi9cblxudmFyIEZvcmdlVmlld2VyID0gY2xhc3MgRm9yZ2VWaWV3ZXIgZXh0ZW5kcyBTcGluYWxWaWV3ZXIge1xuICBjb25zdHJ1Y3Rvcih2aWV3ZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmlld2VyID0gdmlld2VyO1xuICAgIHRoaXMuZXh0ZXJuYWxJZE1hcHBpbmcgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGFzIHBhcmFtZXRlciBhbiBleHRlcm5hbF9pZCAoc3RyaW5nKSBvciBhIGxpc3Qgb2YgZXh0ZXJuYWxfaWQgYW5kIHNlbGVjdHMgdGhlIGl0ZW0ocykgY29ycmVzcG9uZGluZyB0byB0aGlzL3RoZXNlIGV4dGVybmFsX2lkXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGV4dGVybmFsSWRzXG4gICAqL1xuICBzZWxlY3RPYmplY3QoZXh0ZXJuYWxJZHMpIHtcbiAgICB2YXIgYWxsUHJvbWlzZSA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4dGVybmFsSWRzKSkgZXh0ZXJuYWxJZHMgPSBbZXh0ZXJuYWxJZHNdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRlcm5hbElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgYWxsUHJvbWlzZS5wdXNoKHRoaXMuZ2V0RGJJZEJ5RXh0ZXJuYWxJZChleHRlcm5hbElkc1tpXSkpO1xuICAgIH1cblxuICAgIFByb21pc2UuYWxsKGFsbFByb21pc2UpLnRoZW4obGlzdERiSWQgPT4ge1xuICAgICAgdGhpcy52aWV3ZXIuc2VsZWN0KGxpc3REYklkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBmdW5jdGlvbiB0YWtpbmcgaW4gcGFyYW1ldGVyIGFuIGV4dGVybmFsSWQgKHN0cmluZykgYW5kIHJldHVybmluZyBhIFByb21pc2Ugb2YgY29ycmVzcG9uZGluZyBkYklkIChudW1iZXIpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBleHRlcm5hbElkXG4gICAqL1xuICBnZXREYklkQnlFeHRlcm5hbElkKGV4dGVybmFsSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZXh0ZXJuYWxJZE1hcHBpbmdbZXh0ZXJuYWxJZF0pIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmV4dGVybmFsSWRNYXBwaW5nW2V4dGVybmFsSWRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlld2VyLm1vZGVsLmdldEV4dGVybmFsSWRNYXBwaW5nKFxuICAgICAgICAgIGVsID0+IHtcbiAgICAgICAgICAgIHZhciBkYklkID0gZWxbZXh0ZXJuYWxJZF07XG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsSWRNYXBwaW5nW2V4dGVybmFsSWRdID0gZGJJZDtcbiAgICAgICAgICAgIHJlc29sdmUoZGJJZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoXCJObyBkYklkIGFzc29jaWF0ZWQgYXQgdGhpcyBleHRlcm5hbElkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGluIHBhcmFtZXRlciBhIGRiSWQgKG51bWJlcikgYW5kIHJldHVybiB0aGUgY29ycmVzcG9uZGluZyBleHRlcm5hbCBpZCAoc3RyaW5nKVxuICAgKiBAcGFyYW0ge2ludH0gZGJJZFxuICAgKi9cbiAgZ2V0RXh0ZXJuYWxJZEJ5RGJJZChkYklkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMudmlld2VyLm1vZGVsLmdldFByb3BlcnRpZXMoXG4gICAgICAgIGRiSWQsXG4gICAgICAgIGl0ZW1Qcm9wZXJ0aWVzID0+IHtcbiAgICAgICAgICByZXNvbHZlKGl0ZW1Qcm9wZXJ0aWVzLmV4dGVybmFsSWQpO1xuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KFwiTm8gZXh0ZXJuYWwgaWQgYXNzb2NpYXRlZCBhdCB0aGlzIGRiSWRcIik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZnVuY3Rpb24gcmV0cmlldmluZyBhbGwgc2VsZWN0ZWQgaXRlbXMgYW5kIHJldHVybmluZyBhIGxpc3Qgb2YgZXh0ZXJuYWxfaWRcbiAgICovXG4gIGdldHNlbGVjdGVkT2JqZWN0KCkge1xuICAgIHZhciBpdGVtc0RiSWRzID0gdGhpcy52aWV3ZXIuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdmFyIGFsbFByb21pc2UgPSBbXTtcbiAgICAgIGlmIChpdGVtc0RiSWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtc0RiSWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBcImV4dGVybmFsSWRcIixcbiAgICAgICAgICAgIGl0ZW1zRGJJZHNbaV0sXG4gICAgICAgICAgICB0aGlzLmdldEV4dGVybmFsSWRCeURiSWQoaXRlbXNEYklkc1tpXSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGFsbFByb21pc2UucHVzaCh0aGlzLmdldEV4dGVybmFsSWRCeURiSWQoaXRlbXNEYklkc1tpXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgUHJvbWlzZS5hbGwoYWxsUHJvbWlzZSkudGhlbihlbCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShlbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KFwibm8gSXRlbSBTZWxlY3RlZFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGluIHBhcmFtZXRlciBhbiBleHRlcm5hbF9pZCAoc3RyaW5nKSBvciBhIGxpc3Qgb2YgZXh0ZXJuYWxfaWQgYW5kIHpvb20gdGhlIHZpZXdlciBvbiB0aGUgY29ycmVzcG9uZGluZyBlbGVtZW50c1xuICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBleHRlcm5hbElkXG4gICAqL1xuICBmaXRUb1ZpZXcoZXh0ZXJuYWxJZCkge1xuICAgIHZhciBhbGxQcm9taXNlcyA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4dGVybmFsSWQpKSBleHRlcm5hbElkID0gW2V4dGVybmFsSWRdO1xuXG4gICAgY29uc29sZS5sb2coZXh0ZXJuYWxJZCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4dGVybmFsSWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFsbFByb21pc2VzLnB1c2godGhpcy5nZXREYklkQnlFeHRlcm5hbElkKGV4dGVybmFsSWRbaV0pKTtcbiAgICB9XG5cbiAgICBQcm9taXNlLmFsbChhbGxQcm9taXNlcykudGhlbihpZHMgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJpZHNcIiwgaWRzKTtcbiAgICAgIHRoaXMudmlld2VyLmZpdFRvVmlldyhpZHMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqVGhpcyBmdW5jdGlvbiB0YWtlcyBhbiBleHRlcm5hbF9pZCAoc3RyaW5nKSBvciBhIGxpc3Qgb2YgZXh0ZXJuYWxfaWQgaW4gcGFyYW1ldGVyIGFuZCBkaXNwbGF5IG9ubHkgdGhlIGl0ZW1zIGNvcnJlc3BvbmRpbmcgdG8gZXh0ZXJuYWxfaWRcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gZXh0ZXJuYWxJZFxuICAgKi9cbiAgaXNvbGF0ZShleHRlcm5hbElkKSB7XG4gICAgdmFyIGFsbFByb21pc2VzID0gW107XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXh0ZXJuYWxJZCkpIGV4dGVybmFsSWQgPSBbZXh0ZXJuYWxJZF07XG5cbiAgICBjb25zb2xlLmxvZyhleHRlcm5hbElkKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXh0ZXJuYWxJZC5sZW5ndGg7IGkrKykge1xuICAgICAgYWxsUHJvbWlzZXMucHVzaCh0aGlzLmdldERiSWRCeUV4dGVybmFsSWQoZXh0ZXJuYWxJZFtpXSkpO1xuICAgIH1cblxuICAgIFByb21pc2UuYWxsKGFsbFByb21pc2VzKS50aGVuKGlkcyA9PiB7XG4gICAgICB0aGlzLnZpZXdlci5pc29sYXRlQnlJZChpZHMpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICpUaGlzIGZ1bmN0aW9uIHRha2VzIDMgcGFyYW1ldGVycywgYXBwSWQgKHRoZSBhcHBsaWNhdGlvbidzIElEKSwgZXh0ZXJuYWxJZCAodGhlIGlkIG9mIHRoZSBjb2xvcmluZyBlbGVtZW50KSBhbmQgY29sb3IgKGNvbG9yIG5hbWUgb3IgaGV4YWRlY2ltYWwgY29sb3IpLiBJdCBjb2xvcnMgdGhlIGVsZW1lbnQocykgYWNjb3JkaW5nIHRvIHRoZSBjb2xvciBhbmQgdGhlIGFwcElkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcHBJZFxuICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBleHRlcm5hbElkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxuICAgKi9cbiAgY29sb3JPYmplY3QoYXBwSWQsIGV4dGVybmFsSWQsIGNvbG9yKSB7XG4gICAgdmFyIGFsbFByb21pc2VzID0gW107XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXh0ZXJuYWxJZCkpXG4gICAgICBleHRlcm5hbElkID0gW2V4dGVybmFsSWRdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRlcm5hbElkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhbGxQcm9taXNlcy5wdXNoKHRoaXMuZ2V0RGJJZEJ5RXh0ZXJuYWxJZChleHRlcm5hbElkW2ldKSk7XG4gICAgfVxuXG4gICAgUHJvbWlzZS5hbGwoYWxsUHJvbWlzZXMpLnRoZW4oaWRzID0+IHtcbiAgICAgIHRoaXMudmlld2VyLnNldENvbG9yTWF0ZXJpYWwoaWRzLCBjb2xvciwgYXBwSWQpO1xuICAgIH0pXG5cblxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgaW4gcGFyYW1ldGVyIGFuIGFwcElkIGFuZCBleHRlcm5hbF9pZC9saXN0IG9mIGV4dGVybmFsX2lkLiBJdCByZXN0b3JlIHRoZSBkZWZhdWx0IGNvbG9yIG9mIHRoZSBlbGVtZW50KHMpIGFjY29yZGluZyB0byB0aGUgYXBwSWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFwcElkXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGV4dGVybmFsSWRcbiAgICovXG4gIHJlc3RvcmVDb2xvcihhcHBJZCwgZXh0ZXJuYWxJZCkge1xuICAgIHZhciBhbGxQcm9taXNlcyA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4dGVybmFsSWQpKVxuICAgICAgZXh0ZXJuYWxJZCA9IFtleHRlcm5hbElkXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXh0ZXJuYWxJZC5sZW5ndGg7IGkrKykge1xuICAgICAgYWxsUHJvbWlzZXMucHVzaCh0aGlzLmdldERiSWRCeUV4dGVybmFsSWQoZXh0ZXJuYWxJZFtpXSkpO1xuICAgIH1cblxuICAgIFByb21pc2UuYWxsKGFsbFByb21pc2VzKS50aGVuKGVsID0+IHtcbiAgICAgIHRoaXMudmlld2VyLnJlc3RvcmVDb2xvck1hdGVyaWFsKGVsLCBhcHBJZCk7XG4gICAgfSlcblxuICB9XG5cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByb290SWQgXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBzd2VlcChyb290SWQgPSB0aGlzLnZpZXdlci5tb2RlbC5nZXRSb290SWQoKSwgY2FsbGJhY2spIHtcbiAgICAvLyB2YXIgcm9vdElkID0gdGhpcy52aWV3ZXIubW9kZWwuZ2V0Um9vdElkKCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMubW9kZWwuZ2V0RGF0YSgpLmluc3RhbmNlVHJlZS5lbnVtTm9kZUNoaWxkcmVuKHJvb3RJZCwgZWwgPT4ge1xuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICBjYWxsYmFjayhlbCk7XG4gICAgICAgICAgdGhpcy5zd2VlcChlbCwgY2FsbGJhY2spLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9KVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGlzIEZ1bmN0aW9uIHJldHVybnMgdGhlIGNhbWVyYSBhbmQgaXQgKGNhbWVyYSkgY2FuIGJlIG1vZGlmaWVkIGJ5IHRoZSB1c2VyXG4gICAqL1xuICBnZXRDYW1lcmEoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc29sdmUodGhpcy52aWV3ZXIuZ2V0Q2FtZXJhKCkpO1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHNldENhbWVyYSgpIHt9XG5cblxuICAvKipcbiAgICogcmV0dXJucyBhIHByb21pc2Ugb2YgYSBsaXN0IG9mIGFjdGl2ZSBjdXQgUGxhbmVzXG4gICAqL1xuICBnZXRDdXRQbGFuZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc29sdmUodGhpcy52aWV3ZXIuZ2V0Q3V0UGxhbmVzKCkpO1xuICAgIH0pO1xuICB9XG5cblxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzZXRDdXRQbGFuZXMoKSB7fVxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICByZXNnaXN0ZXJFdmVudCgpIHt9XG5cblxuXG5cbiAgLyoqXG4gICAqIFxuICAgKiB0aGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSBwYW5lbCBpbiB0aGUgdmlld2VyLCBpdCB0YWtlcyBhcyBwYXJhbWV0ZXJzIHRoZSBwYW5lbFRpdGxlKHN0cmluZyksIHRoZSBwYW5lbCB3aWR0aChudW1iZXIgaW4gcGVyY2VudCwgZGVmYXVsdCB2YWx1ZSBpcyA0MCksIHRoZSBwYW5lbCBoZWlnaHQgKG51bWJlciBpbiBwZXJjZW50LCBkZWZhdWx0IHZhbHVlIGlzIDgwKSBhbmQgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIG9mIHRoZSBwYW5lbCA6IHRvcChudW1iZXIgaW4gcHgsIGRlZmF1bHQgdmFsdWUgaXMgMHB4KSBcbiAgICogXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYW5lbFRpdGxlIFxuICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgXG4gICAqL1xuICBjcmVhdGVQYW5lbChwYW5lbFRpdGxlLCB3aWR0aCA9IDQwLCBoZWlnaHQgPSA4MCwgdG9wID0gMCkge1xuICAgIHZhciBwYW5lbCA9IG5ldyBQYW5lbENsYXNzKHRoaXMudmlld2VyLCBwYW5lbFRpdGxlKTtcbiAgICBwYW5lbC5jb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgXCJweFwiO1xuICAgIHBhbmVsLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCIlXCI7XG4gICAgcGFuZWwuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwiJVwiO1xuXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBwYW5lbC5jb250YWluZXIuaWQgKyBwYW5lbFRpdGxlO1xuICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBcImNhbGMoMTAwJSAtIDU1cHgpXCI7XG4gICAgZGl2LnN0eWxlLm92ZXJmbG93WSA9IFwiYXV0b1wiO1xuXG4gICAgcGFuZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG5cblxuICAgIHJldHVybiBwYW5lbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGluIHBhcmFtcyBhbiBleHRlcm5hbElkKHN0cmluZykgYW5kIHJldHVybnMgaXRlbSBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBleHRlcm5hbElkIFxuICAgKi9cbiAgZ2V0UHJvcHMoZXh0ZXJuYWxJZCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZ2V0RGJJZEJ5RXh0ZXJuYWxJZChleHRlcm5hbElkKS50aGVuKGVsID0+IHtcbiAgICAgICAgdGhpcy52aWV3ZXIubW9kZWwuZ2V0UHJvcGVydGllcyhcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBpdGVtUHJvcGVydGllcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGl0ZW1Qcm9wZXJ0aWVzKTtcbiAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoXCJObyBJdGVtIGZvdW5kXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9KVxuICB9XG5cbn1cbm1vZHVsZS5leHBvcnRzID0gRm9yZ2VWaWV3ZXI7Il19