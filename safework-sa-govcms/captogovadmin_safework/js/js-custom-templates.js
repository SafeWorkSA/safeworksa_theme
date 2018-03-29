/*
  CKEditor Custom Templates, for govme
*/
CKEDITOR.addTemplates("default", {
    imagesPath: CKEDITOR.getUrl(CKEDITOR.plugins.getPath("templates") + "templates/images/"),
    templates: [
      {
          title: "Accordion row",
          image: "template1.gif",
          description: "Accordion content.",
          html: '\x3cdetails open class="accordion-row"\x3e\x3cdiv class="accordion-button"\x3eAccordion Button\x3c/div\x3e\x3cdiv class="accordion-content accordion-panel"\x3e\x3cp\x3eNulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.\x3c/p\x3e\x3c/div\x3e\x3c/details\x3e'
      },
      {
          title: "Tab",
          image: "template1.gif",
          description: "Tab content.",
          html: '\x3cdiv class="single-tab"\x3e\x3cdiv class="tab-title"\x3eTab title\x3c/div\x3e\x3cdiv class="tab-content"\x3e\x3cp\x3eNulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.\x3c/p\x3e\x3c/div\x3e\x3c/div\x3e'
      },
      {
          title: "Two columns",
          image: "template1.gif",
          description: "Two columns.",
          html: '\x3cdiv class="two-columns"\x3e\x3cdiv class="single-col col-1"\x3e\x3cp\x3eNulla porttitor accumsan tincidunt. Column 1.\x3c/p\x3e\x3c/div\x3e\x3cdiv class="single-col col-2"\x3e\x3cp\x3eDonec rutrum congue leo eget malesuada. Column 2.\x3c/p\x3e\x3c/div\x3e\x3c/div\x3e'
      },
      {
          title: "Three columns",
          image: "template1.gif",
          description: "Three columns.",
          html: '\x3cdiv class="three-columns"\x3e\x3cdiv class="single-col col-1"\x3e\x3cp\x3eNulla porttitor accumsan tincidunt. Column 1.\x3c/p\x3e\x3c/div\x3e\x3cdiv class="single-col col-2"\x3e\x3cp\x3eDonec rutrum congue leo eget malesuada. Column 2.\x3c/p\x3e\x3c/div\x3e\x3cdiv class="single-col col-3"\x3e\x3cp\x3eNulla porttitor accumsan tincidunt. Column 3.\x3c/p\x3e\x3c/div\x3e\x3c/div\x3e'
      }
      // {
      //     title: "Two Columns",
      //     image: "template1.gif",
      //     description: "Row of content in two columns.",
      //     html: '\x3cdiv class="drupalgov-template two-cols"\x3e\x3cdiv class="col col-1 first"\x3e\x3ch3\x3eFirst column heading\x3c/h3\x3e\x3cp\x3eParagraph text\x3c/p\x3e\x3c/div\x3e\x3cdiv class="col col-2 last"\x3e\x3ch3\x3eSecond column heading\x3c/h3\x3e\x3cp\x3eParagraph text\x3c/p\x3e\x3c/div\x3e\x3c/div\x3e'
      // },
      // {
      //     title: "Three Columns",
      //     image: "template1.gif",
      //     description: "Row of content in three columns.",
      //     html: '\x3cdiv class="drupalgov-template three-cols"\x3e\x3cdiv class="col col-1 first"\x3e\x3ch3\x3eFirst column heading\x3c/h3\x3e\x3cp\x3eParagraph text\x3c/p\x3e\x3c/div\x3e\x3cdiv class="col col-2"\x3e\x3ch3\x3eSecond column heading\x3c/h3\x3e\x3cp\x3eParagraph text\x3c/p\x3e\x3c/div\x3e\x3cdiv class="col col-3 last"\x3e\x3ch3\x3eThird column heading\x3c/h3\x3e\x3cp\x3eParagraph text\x3c/p\x3e\x3c/div\x3e\x3c/div\x3e'
      // }
    ]
});

