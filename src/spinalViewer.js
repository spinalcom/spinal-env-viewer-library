const SpinalViewer = class {
  constructor() {
    if (this.constructor === SpinalViewer) {
      throw new TypeError(
        'Abstract class "SpinalViewer" cannot be instantiated directly')
    }
  }

  selectObject(dbIds) {
    throw new Error('You must implement selectObject function');
  }

  // getExternalId(dbIds) {
  //   throw new Error('You must implement getExternalId function');
  // }

  getDbIdByExternalId(externalId) {
    throw new Error('You must implement getselectedObject function');
  }

  getselectedObject() {
    throw new Error('You must implement getselectedObject function');
  }


  fitToView(dbIds) {
    throw new Error('You must implement fitToView function');
  }

  isolate(dbIds) {
    throw new Error('You must implement isolate function');
  }

  sweep() {
    throw new Error('You must implement sweep function');
  }

  colorObject(appId, dbIds, color) {
    throw new Error('You must implement colorObject function');
  }

  restoreColor(appId, dbIds) {
    throw new Error('You must implement restoreColor function');
  }

  getCamera() {
    throw new Error('You must implement getCamera function');
  }

  setCamera() {
    throw new Error('You must implement setCamera function');
  }

  getDbId() {
    throw new Error('You must implement getDbId function');
  }

  getExternalId() {
    throw new Error('You must implement getExternalId function');
  }

  resgisterEvent() {
    throw new Error('You must implement resgisterEvent function');
  }

  getCutPlanes() {
    throw new Error('You must implement getCutPlanes function');
  }

  setCutPlanes() {
    throw new Error('You must implement setCutPlanes function');
  }

  createPanel() {
    throw new Error('You must implement createPanel function');
  }

}

module.exports = SpinalViewer;