"use strict";

const SpinalViewer = require("./spinalViewer");

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
          reject("No external id associated at this dbId");
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
   *
   */
  sweep() {}

  /**
   *This function takes 3 parameters, appId (the application's ID), externalId (the id of the coloring element) and color. It colors the element(s) according to the color and the appId
   *
   * @param {string} appId
   * @param {Array.<string>} externalId
   * @param {string} color
   */
  colorObject(appId, externalId, color) {}

  /**
   * This function takes in parameter an appId and external_id/list of external_id. It restore the default color of the element(s) according to the appId
   * @param {String} appId
   * @param {Array.<string>} externalId
   */
  restoreColor(appId, externalId) {}

  /**
   *
   */
  getCamera() {}

  /**
   *
   */
  setCamera() {}

  /**
   *
   */
  resgisterEvent() {}

  /**
   *
   */
  getCutPlanes() {}

  /**
   *
   */
  setCutPlanes() {}

  /**
   *
   */
  createPanel() {}
};

module.exports = ForgeViewer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JnZVZpZXdlci5qcyJdLCJuYW1lcyI6WyJTcGluYWxWaWV3ZXIiLCJyZXF1aXJlIiwiRm9yZ2VWaWV3ZXIiLCJjb25zdHJ1Y3RvciIsInZpZXdlciIsImV4dGVybmFsSWRNYXBwaW5nIiwic2VsZWN0T2JqZWN0IiwiZXh0ZXJuYWxJZHMiLCJhbGxQcm9taXNlIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXREYklkQnlFeHRlcm5hbElkIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJsaXN0RGJJZCIsInNlbGVjdCIsImV4dGVybmFsSWQiLCJyZXNvbHZlIiwicmVqZWN0IiwibW9kZWwiLCJnZXRFeHRlcm5hbElkTWFwcGluZyIsImVsIiwiZGJJZCIsImdldEV4dGVybmFsSWRCeURiSWQiLCJnZXRQcm9wZXJ0aWVzIiwiaXRlbVByb3BlcnRpZXMiLCJnZXRzZWxlY3RlZE9iamVjdCIsIml0ZW1zRGJJZHMiLCJnZXRTZWxlY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiZml0VG9WaWV3IiwiYWxsUHJvbWlzZXMiLCJpZHMiLCJpc29sYXRlIiwiaXNvbGF0ZUJ5SWQiLCJzd2VlcCIsImNvbG9yT2JqZWN0IiwiYXBwSWQiLCJjb2xvciIsInJlc3RvcmVDb2xvciIsImdldENhbWVyYSIsInNldENhbWVyYSIsInJlc2dpc3RlckV2ZW50IiwiZ2V0Q3V0UGxhbmVzIiwic2V0Q3V0UGxhbmVzIiwiY3JlYXRlUGFuZWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU1BLGVBQWVDLFFBQVEsZ0JBQVIsQ0FBckI7O0FBRUEsSUFBSUMsY0FBYyxNQUFNQSxXQUFOLFNBQTBCRixZQUExQixDQUF1QztBQUN2REcsY0FBWUMsTUFBWixFQUFvQjtBQUNsQjtBQUNBLFNBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLEVBQXpCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsZUFBYUMs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QixDQUFFOztBQUVuQjs7O0FBR0FDLGlCQUFlLENBQUU7O0FBRWpCOzs7QUFHQUMsaUJBQWUsQ0FBRTs7QUFFakI7OztBQUdBQyxnQkFBYyxDQUFFO0FBdkx1QyxDQUF6RDs7QUEwTEFDLE9BQU9DLE9BQVAsR0FBaUJsRCxXQUFqQiIsImZpbGUiOiJmb3JnZVZpZXdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNwaW5hbFZpZXdlciA9IHJlcXVpcmUoXCIuL3NwaW5hbFZpZXdlclwiKTtcblxudmFyIEZvcmdlVmlld2VyID0gY2xhc3MgRm9yZ2VWaWV3ZXIgZXh0ZW5kcyBTcGluYWxWaWV3ZXIge1xuICBjb25zdHJ1Y3Rvcih2aWV3ZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmlld2VyID0gdmlld2VyO1xuICAgIHRoaXMuZXh0ZXJuYWxJZE1hcHBpbmcgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGFzIHBhcmFtZXRlciBhbiBleHRlcm5hbF9pZCAoc3RyaW5nKSBvciBhIGxpc3Qgb2YgZXh0ZXJuYWxfaWQgYW5kIHNlbGVjdHMgdGhlIGl0ZW0ocykgY29ycmVzcG9uZGluZyB0byB0aGlzL3RoZXNlIGV4dGVybmFsX2lkXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGV4dGVybmFsSWRzXG4gICAqL1xuICBzZWxlY3RPYmplY3QoZXh0ZXJuYWxJZHMpIHtcbiAgICB2YXIgYWxsUHJvbWlzZSA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4dGVybmFsSWRzKSkgZXh0ZXJuYWxJZHMgPSBbZXh0ZXJuYWxJZHNdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRlcm5hbElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgYWxsUHJvbWlzZS5wdXNoKHRoaXMuZ2V0RGJJZEJ5RXh0ZXJuYWxJZChleHRlcm5hbElkc1tpXSkpO1xuICAgIH1cblxuICAgIFByb21pc2UuYWxsKGFsbFByb21pc2UpLnRoZW4obGlzdERiSWQgPT4ge1xuICAgICAgdGhpcy52aWV3ZXIuc2VsZWN0KGxpc3REYklkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBmdW5jdGlvbiB0YWtpbmcgaW4gcGFyYW1ldGVyIGFuIGV4dGVybmFsSWQgKHN0cmluZykgYW5kIHJldHVybmluZyBhIFByb21pc2Ugb2YgY29ycmVzcG9uZGluZyBkYklkIChudW1iZXIpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBleHRlcm5hbElkXG4gICAqL1xuICBnZXREYklkQnlFeHRlcm5hbElkKGV4dGVybmFsSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZXh0ZXJuYWxJZE1hcHBpbmdbZXh0ZXJuYWxJZF0pIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmV4dGVybmFsSWRNYXBwaW5nW2V4dGVybmFsSWRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlld2VyLm1vZGVsLmdldEV4dGVybmFsSWRNYXBwaW5nKFxuICAgICAgICAgIGVsID0+IHtcbiAgICAgICAgICAgIHZhciBkYklkID0gZWxbZXh0ZXJuYWxJZF07XG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsSWRNYXBwaW5nW2V4dGVybmFsSWRdID0gZGJJZDtcbiAgICAgICAgICAgIHJlc29sdmUoZGJJZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoXCJObyBleHRlcm5hbCBpZCBhc3NvY2lhdGVkIGF0IHRoaXMgZGJJZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBpbiBwYXJhbWV0ZXIgYSBkYklkIChudW1iZXIpIGFuZCByZXR1cm4gdGhlIGNvcnJlc3BvbmRpbmcgZXh0ZXJuYWwgaWQgKHN0cmluZylcbiAgICogQHBhcmFtIHtpbnR9IGRiSWRcbiAgICovXG4gIGdldEV4dGVybmFsSWRCeURiSWQoZGJJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnZpZXdlci5tb2RlbC5nZXRQcm9wZXJ0aWVzKFxuICAgICAgICBkYklkLFxuICAgICAgICBpdGVtUHJvcGVydGllcyA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShpdGVtUHJvcGVydGllcy5leHRlcm5hbElkKTtcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHJlamVjdChcIk5vIGV4dGVybmFsIGlkIGFzc29jaWF0ZWQgYXQgdGhpcyBkYklkXCIpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGZ1bmN0aW9uIHJldHJpZXZpbmcgYWxsIHNlbGVjdGVkIGl0ZW1zIGFuZCByZXR1cm5pbmcgYSBsaXN0IG9mIGV4dGVybmFsX2lkXG4gICAqL1xuICBnZXRzZWxlY3RlZE9iamVjdCgpIHtcbiAgICB2YXIgaXRlbXNEYklkcyA9IHRoaXMudmlld2VyLmdldFNlbGVjdGlvbigpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHZhciBhbGxQcm9taXNlID0gW107XG4gICAgICBpZiAoaXRlbXNEYklkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXNEYklkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgXCJleHRlcm5hbElkXCIsXG4gICAgICAgICAgICBpdGVtc0RiSWRzW2ldLFxuICAgICAgICAgICAgdGhpcy5nZXRFeHRlcm5hbElkQnlEYklkKGl0ZW1zRGJJZHNbaV0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBhbGxQcm9taXNlLnB1c2godGhpcy5nZXRFeHRlcm5hbElkQnlEYklkKGl0ZW1zRGJJZHNbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFByb21pc2UuYWxsKGFsbFByb21pc2UpLnRoZW4oZWwgPT4ge1xuICAgICAgICAgIHJlc29sdmUoZWwpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChcIm5vIEl0ZW0gU2VsZWN0ZWRcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBpbiBwYXJhbWV0ZXIgYW4gZXh0ZXJuYWxfaWQgKHN0cmluZykgb3IgYSBsaXN0IG9mIGV4dGVybmFsX2lkIGFuZCB6b29tIHRoZSB2aWV3ZXIgb24gdGhlIGNvcnJlc3BvbmRpbmcgZWxlbWVudHNcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gZXh0ZXJuYWxJZFxuICAgKi9cbiAgZml0VG9WaWV3KGV4dGVybmFsSWQpIHtcbiAgICB2YXIgYWxsUHJvbWlzZXMgPSBbXTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShleHRlcm5hbElkKSkgZXh0ZXJuYWxJZCA9IFtleHRlcm5hbElkXTtcblxuICAgIGNvbnNvbGUubG9nKGV4dGVybmFsSWQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRlcm5hbElkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhbGxQcm9taXNlcy5wdXNoKHRoaXMuZ2V0RGJJZEJ5RXh0ZXJuYWxJZChleHRlcm5hbElkW2ldKSk7XG4gICAgfVxuXG4gICAgUHJvbWlzZS5hbGwoYWxsUHJvbWlzZXMpLnRoZW4oaWRzID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaWRzXCIsIGlkcyk7XG4gICAgICB0aGlzLnZpZXdlci5maXRUb1ZpZXcoaWRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlRoaXMgZnVuY3Rpb24gdGFrZXMgYW4gZXh0ZXJuYWxfaWQgKHN0cmluZykgb3IgYSBsaXN0IG9mIGV4dGVybmFsX2lkIGluIHBhcmFtZXRlciBhbmQgZGlzcGxheSBvbmx5IHRoZSBpdGVtcyBjb3JyZXNwb25kaW5nIHRvIGV4dGVybmFsX2lkXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGV4dGVybmFsSWRcbiAgICovXG4gIGlzb2xhdGUoZXh0ZXJuYWxJZCkge1xuICAgIHZhciBhbGxQcm9taXNlcyA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4dGVybmFsSWQpKSBleHRlcm5hbElkID0gW2V4dGVybmFsSWRdO1xuXG4gICAgY29uc29sZS5sb2coZXh0ZXJuYWxJZCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4dGVybmFsSWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFsbFByb21pc2VzLnB1c2godGhpcy5nZXREYklkQnlFeHRlcm5hbElkKGV4dGVybmFsSWRbaV0pKTtcbiAgICB9XG5cbiAgICBQcm9taXNlLmFsbChhbGxQcm9taXNlcykudGhlbihpZHMgPT4ge1xuICAgICAgdGhpcy52aWV3ZXIuaXNvbGF0ZUJ5SWQoaWRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc3dlZXAoKSB7fVxuXG4gIC8qKlxuICAgKlRoaXMgZnVuY3Rpb24gdGFrZXMgMyBwYXJhbWV0ZXJzLCBhcHBJZCAodGhlIGFwcGxpY2F0aW9uJ3MgSUQpLCBleHRlcm5hbElkICh0aGUgaWQgb2YgdGhlIGNvbG9yaW5nIGVsZW1lbnQpIGFuZCBjb2xvci4gSXQgY29sb3JzIHRoZSBlbGVtZW50KHMpIGFjY29yZGluZyB0byB0aGUgY29sb3IgYW5kIHRoZSBhcHBJZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBwSWRcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gZXh0ZXJuYWxJZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcbiAgICovXG4gIGNvbG9yT2JqZWN0KGFwcElkLCBleHRlcm5hbElkLCBjb2xvcikge31cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBpbiBwYXJhbWV0ZXIgYW4gYXBwSWQgYW5kIGV4dGVybmFsX2lkL2xpc3Qgb2YgZXh0ZXJuYWxfaWQuIEl0IHJlc3RvcmUgdGhlIGRlZmF1bHQgY29sb3Igb2YgdGhlIGVsZW1lbnQocykgYWNjb3JkaW5nIHRvIHRoZSBhcHBJZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXBwSWRcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gZXh0ZXJuYWxJZFxuICAgKi9cbiAgcmVzdG9yZUNvbG9yKGFwcElkLCBleHRlcm5hbElkKSB7fVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZ2V0Q2FtZXJhKCkge31cblxuICAvKipcbiAgICpcbiAgICovXG4gIHNldENhbWVyYSgpIHt9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICByZXNnaXN0ZXJFdmVudCgpIHt9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBnZXRDdXRQbGFuZXMoKSB7fVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc2V0Q3V0UGxhbmVzKCkge31cblxuICAvKipcbiAgICpcbiAgICovXG4gIGNyZWF0ZVBhbmVsKCkge31cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRm9yZ2VWaWV3ZXI7XG4iXX0=