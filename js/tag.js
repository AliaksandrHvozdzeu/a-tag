const tagSettings = {
  "applicationName": 'application-name',
  "applicationVersion": '1.0',
  "languageCode": 'en',
  "pageType": 'page type',
  "tags": {
    "aTagHandler": "a-tag-handler",
    "aTagEvent": "a-tag-event",
    "aTagCategory": "a-tag-category",
    "aTagCustomEvent": "a-tag-custom-event",
  }
};

const {
  applicationName: APPLICATION_NAME,
  applicationVersion: APPLICATION_VERSION,
  languageCode: LANGUAGE_CODE,
  pageType: PAGE_TYPE,
  tags: TAGS
} = tagSettings;

//Create analytic object
function handleTagElement(element) {
  if (window.digitalDataLayer) {

    const aTagHandler = element.getAttribute(TAGS.aTagHandler) || "";
    const aTagEvent = element.getAttribute(TAGS.aTagEvent) || "";
    const aTagCategory = element.getAttribute(TAGS.aTagCategory) || "";
    const aTagCustomEvent = element.getAttribute(TAGS.aTagCustomEvent) || "";
    const pageSiteSection = window.location.href.split('/').slice(-3, -2)[0];
    const pageNameSegment = window.location.href.split('/').find((segment) => segment.includes('.html'));
    const pageName = pageNameSegment ? pageNameSegment.replace('.html#', '').replace('.html', '') : '';
    const href = window.location.href;
    const hostname = window.location.hostname;
    const entrainmentName = hostname.split('.')[0];
    const documentReferrer = document.referrer;

    const data = {
      event: aTagEvent,
      data: {
        environment: {
          applicationVersion: APPLICATION_VERSION,
          applicationName: APPLICATION_NAME,
          environmentName: entrainmentName,
          siteName: hostname,
          statusCode: 200,
        },
        location: {
          languageCode: LANGUAGE_CODE,
        },
        page: {
          pageName: pageName,
          pageURL: href,
          pageSiteSection: pageSiteSection,
          pageType: PAGE_TYPE,
          pagePreviousURL: documentReferrer,
          customEvents: [
            aTagCustomEvent,
          ],
        },
        ctaInfo: {
          name: aTagCategory,
          url: href,
          action: LANGUAGE_CODE,
          type: aTagHandler,
        },
      },
    };

    window.digitalDataLayer.push(data);
  }
}

//Init tag observer js
if (window.TagObserver) {
  const observer = new window.TagObserver(Object.values(TAGS), (element) => {
  });
  observer.startObserving();
} else {
  console.error("Tag observer was not loaded!");
}


//on click element tag handler
document.addEventListener('click', (event) => {
  const target = event.target.closest('[a-tag-handler]');
  if (target) {
    handleTagElement(target);
  }
});
