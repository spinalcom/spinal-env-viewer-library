"use strict";

const SpinalViewer = require('./spinalViewer');

var ForgeViewer = class ForgeViewer extends SpinalViewer {

  constructor(viewer) {

    super();
    this.viewer = viewer;
    this.externalIdMapping = {};
  }

  /**
   * This function takes as parameter an external_id (string) or a list of external_id and selects the item(s) corresponding to this/these dbId 
   * @param {Array.<string>} externalIds
   */
  selectObject(externalIds) {
    if (!Array.isArray(externalIds)) externalIds = [externalIds];

    this.viewer.select(this.getDbIdByExternalId(externalIds));
  }

  /**
   * function taking in parameter an externalId (string) and returning a Promise of corresponding dbId
   * @param {string} externalId 
   */
  getDbIdByExternalId(externalId) {
    var dbId = [];

    if (!Array.isArray(externalId)) externalId = [externalId];

    for (var i = 0; i < externalId.length; i++) {
      var ext = externalId[i];
      console.log("external[i]", ext);

      if (this.externalIdMapping[ext]) {
        dbId.push(this.externalIdMapping[ext]);
      } else {
        this.viewer.model.getExternalIdMapping(el => {
          console.log("this", el[ext]);
          dbId.push(el[ext]);
          this.externalIdMapping[ext] = dbId;
        });
      }
    }

    return dbId;
  }

  /**
   * function retrieving all selected items and returning a list of external_id
   */
  getselectedObject() {
    var itemsDbIds = this.viewer.getSelection();

    var externalIds = [];

    if (itemsDbIds.length > 0) {
      for (var i = 0; i < itemsDbIds.length; i++) {
        this.viewer.model.getProperties(itemsDbIds[i], itemProperties => {
          console.log(itemProperties.externalId);
          externalIds.push(itemProperties.externalId);
        });
      }
    }

    return externalIds;
  }

  /**
   * This function takes in parameter an external_id (string) or a list of external_id and zoom
   * @param {Array.<string>} externalId 
   */
  fitToView(externalId) {
    if (Array.isArray(externalId)) externalId = [externalId];

    var ids = this.getDbIdByExternalId(externalId);

    this.viewer.fitToView(ids);
  }

  /**
   * 
   * @param {Array.<string>} externalId 
   */
  isolate(externalId) {}

  /**
   * 
   */
  sweep() {}

  /**
   * 
   * @param {string} appId 
   * @param {Array.<string>} dbIds 
   * @param {string} color
   */
  colorObject(appId, dbIds, color) {}

  /**
   * 
   * @param {String} appId 
   * @param {Array.<string>} dbIds 
   */
  restoreColor(appId, dbIds) {}

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
  getDbId() {}

  /**
   * 
   */
  getExternalId() {}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JnZVZpZXdlci5qcyJdLCJuYW1lcyI6WyJTcGluYWxWaWV3ZXIiLCJyZXF1aXJlIiwiRm9yZ2VWaWV3ZXIiLCJjb25zdHJ1Y3RvciIsInZpZXdlciIsImV4dGVybmFsSWRNYXBwaW5nIiwic2VsZWN0T2JqZWN0IiwiZXh0ZXJuYWxJZHMiLCJBcnJheSIsImlzQXJyYXkiLCJzZWxlY3QiLCJnZXREYklkQnlFeHRlcm5hbElkIiwiZXh0ZXJuYWxJZCIsImRiSWQiLCJpIiwibGVuZ3RoIiwiZXh0IiwiY29uc29sZSIsImxvZyIsInB1c2giLCJtb2RlbCIsImdldEV4dGVybmFsSWRNYXBwaW5nIiwiZWwiLCJnZXRzZWxlY3RlZE9iamVjdCIsIml0ZW1zRGJJZHMiLCJnZXRTZWxlY3Rpb24iLCJnZXRQcm9wZXJ0aWVzIiwiaXRlbVByb3BlcnRpZXMiLCJmaXRUb1ZpZXciLCJpZHMiLCJpc29sYXRlIiwic3dlZXAiLCJjb2xvck9iamVjdCIsImFwcElkIiwiZGJJZHMiLCJjb2xvciIsInJlc3RvcmVDb2xvciIsImdldENhbWVyYSIsInNldENhbWVyYSIsImdldERiSWQiLCJnZXRFeHRlcm5hbElkIiwicmVzZ2lzdGVyRXZlbnQiLCJnZXRDdXRQbGFuZXMiLCJzZXRDdXRQbGFuZXMiLCJjcmVhdGVQYW5lbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTUEsZUFBZUMsUUFBUSxnQkFBUixDQUFyQjs7QUFHQSxJQUFJQyxjQUFjLE1BQU1BLFdBQU4sU0FBMEJGLFlBQTFCLENBQXVDOztBQUV2REcsY0FBWUMsTUFBWixFQUFvQjs7QUFFbEI7QUFDQSxTQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QixFQUF6QjtBQUNEOztBQUVEOzs7O0FBSUFDLGVBQWFDLFdBQWIsRUFBMEI7QUFDeEIsUUFBSSxDQUFDQyxNQUFNQyxPQUFOLENBQWNGLFdBQWQsQ0FBTCxFQUNFQSxjQUFjLENBQUNBLFdB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ZXF1aXJlKCcuL3NwaW5hbFZpZXdlcicpO1xuXG5cbnZhciBGb3JnZVZpZXdlciA9IGNsYXNzIEZvcmdlVmlld2VyIGV4dGVuZHMgU3BpbmFsVmlld2VyIHtcblxuICBjb25zdHJ1Y3Rvcih2aWV3ZXIpIHtcblxuICAgIHN1cGVyKCk7XG4gICAgdGhpcy52aWV3ZXIgPSB2aWV3ZXI7XG4gICAgdGhpcy5leHRlcm5hbElkTWFwcGluZyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYXMgcGFyYW1ldGVyIGFuIGV4dGVybmFsX2lkIChzdHJpbmcpIG9yIGEgbGlzdCBvZiBleHRlcm5hbF9pZCBhbmQgc2VsZWN0cyB0aGUgaXRlbShzKSBjb3JyZXNwb25kaW5nIHRvIHRoaXMvdGhlc2UgZGJJZCBcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gZXh0ZXJuYWxJZHNcbiAgICovXG4gIHNlbGVjdE9iamVjdChleHRlcm5hbElkcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHRlcm5hbElkcykpXG4gICAgICBleHRlcm5hbElkcyA9IFtleHRlcm5hbElkc107XG5cbiAgICB0aGlzLnZpZXdlci5zZWxlY3QodGhpcy5nZXREYklkQnlFeHRlcm5hbElkKGV4dGVybmFsSWRzKSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBmdW5jdGlvbiB0YWtpbmcgaW4gcGFyYW1ldGVyIGFuIGV4dGVybmFsSWQgKHN0cmluZykgYW5kIHJldHVybmluZyBhIFByb21pc2Ugb2YgY29ycmVzcG9uZGluZyBkYklkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBleHRlcm5hbElkIFxuICAgKi9cbiAgZ2V0RGJJZEJ5RXh0ZXJuYWxJZChleHRlcm5hbElkKSB7XG4gICAgdmFyIGRiSWQgPSBbXTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShleHRlcm5hbElkKSlcbiAgICAgIGV4dGVybmFsSWQgPSBbZXh0ZXJuYWxJZF07XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXh0ZXJuYWxJZC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGV4dCA9IGV4dGVybmFsSWRbaV1cbiAgICAgIGNvbnNvbGUubG9nKFwiZXh0ZXJuYWxbaV1cIiwgZXh0KTtcblxuICAgICAgaWYgKHRoaXMuZXh0ZXJuYWxJZE1hcHBpbmdbZXh0XSkge1xuICAgICAgICBkYklkLnB1c2godGhpcy5leHRlcm5hbElkTWFwcGluZ1tleHRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlld2VyLm1vZGVsLmdldEV4dGVybmFsSWRNYXBwaW5nKChlbCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpc1wiLCBlbFtleHRdKTtcbiAgICAgICAgICBkYklkLnB1c2goZWxbZXh0XSk7XG4gICAgICAgICAgdGhpcy5leHRlcm5hbElkTWFwcGluZ1tleHRdID0gZGJJZDtcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgIH1cblxuXG4gICAgcmV0dXJuIGRiSWQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBmdW5jdGlvbiByZXRyaWV2aW5nIGFsbCBzZWxlY3RlZCBpdGVtcyBhbmQgcmV0dXJuaW5nIGEgbGlzdCBvZiBleHRlcm5hbF9pZFxuICAgKi9cbiAgZ2V0c2VsZWN0ZWRPYmplY3QoKSB7XG4gICAgdmFyIGl0ZW1zRGJJZHMgPSB0aGlzLnZpZXdlci5nZXRTZWxlY3Rpb24oKTtcblxuICAgIHZhciBleHRlcm5hbElkcyA9IFtdO1xuXG4gICAgaWYgKGl0ZW1zRGJJZHMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtc0RiSWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMudmlld2VyLm1vZGVsLmdldFByb3BlcnRpZXMoaXRlbXNEYklkc1tpXSwgKGl0ZW1Qcm9wZXJ0aWVzKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coaXRlbVByb3BlcnRpZXMuZXh0ZXJuYWxJZCk7XG4gICAgICAgICAgZXh0ZXJuYWxJZHMucHVzaChpdGVtUHJvcGVydGllcy5leHRlcm5hbElkKTtcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZXJuYWxJZHM7XG5cbiAgfVxuXG5cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBpbiBwYXJhbWV0ZXIgYW4gZXh0ZXJuYWxfaWQgKHN0cmluZykgb3IgYSBsaXN0IG9mIGV4dGVybmFsX2lkIGFuZCB6b29tXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGV4dGVybmFsSWQgXG4gICAqL1xuICBmaXRUb1ZpZXcoZXh0ZXJuYWxJZCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGV4dGVybmFsSWQpKSBleHRlcm5hbElkID0gW2V4dGVybmFsSWRdO1xuXG4gICAgdmFyIGlkcyA9IHRoaXMuZ2V0RGJJZEJ5RXh0ZXJuYWxJZChleHRlcm5hbElkKTtcblxuICAgIHRoaXMudmlld2VyLmZpdFRvVmlldyhpZHMpO1xuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gZXh0ZXJuYWxJZCBcbiAgICovXG4gIGlzb2xhdGUoZXh0ZXJuYWxJZCkge1xuXG4gIH1cblxuICAvKipcbiAgICogXG4gICAqL1xuICBzd2VlcCgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBwSWQgXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGRiSWRzIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcbiAgICovXG4gIGNvbG9yT2JqZWN0KGFwcElkLCBkYklkcywgY29sb3IpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXBwSWQgXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGRiSWRzIFxuICAgKi9cbiAgcmVzdG9yZUNvbG9yKGFwcElkLCBkYklkcykge1xuXG4gIH1cblxuICAvKipcbiAgICogXG4gICAqL1xuICBnZXRDYW1lcmEoKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICovXG4gIHNldENhbWVyYSgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgZ2V0RGJJZCgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgZ2V0RXh0ZXJuYWxJZCgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgcmVzZ2lzdGVyRXZlbnQoKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICovXG4gIGdldEN1dFBsYW5lcygpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgc2V0Q3V0UGxhbmVzKCkge1xuXG4gIH1cblxuICAvKipcbiAgICogXG4gICAqL1xuICBjcmVhdGVQYW5lbCgpIHtcblxuICB9XG5cblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9yZ2VWaWV3ZXI7Il19