

// Calculator backgrounds and colors
KJE.ErrorBackground="#FF7777"; // backgroundColor
KJE.IncompleteBackground="#FFFF77";
KJE.ClearColor="#FFFFFF";
KJE.colorList=["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"];

// Report Header and Footer
KJE.ReportHeader="<div class='KJEReportTitleBlock'><div class='KJEReportTitle'>**REPORT_TITLE**</div>data2.profitstarscms.com</div>";
KJE.ReportFooter="<div class=KJECenter><p class='KJEReportFooter KJECenter'>Information and interactive calculators are made available to you as self-help tools for your independent use and are not intended to provide investment advice. We cannot and do not guarantee their applicability or accuracy in regards to your individual circumstances. All examples are hypothetical and are for illustrative purposes.  We encourage you to seek personalized advice from qualified professionals regarding all personal finance issues.</p></div><!--EXTRA_FOOTER-->";

KJE.parseDefinitions = function(sDefn) {
  return KJE.replace("<a href='http", "<a onclick='return KJE.clickAlert();' href='http",sDefn);
};

KJE.clickAlert=function() {
  return confirm("This Financial Institution has no control over information at any site hyperlinked to or from this Site. The Financial Institution makes no representation concerning and is not responsible for the quality, content, nature, or reliability of any hyperlinked site and is providing this hyperlink to you only as a convenience. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by this Financial Institution of any information in any hyperlinked site. In no event shall this Financial Institution be responsible for your use of a hyperlinked site.");
};


// Graph fonts, colors and heights
KJE.gFont           = ["Helvetica","Helvetica","Helvetica"];
KJE.gFontStyle      = ["bold","bold",""];
KJE.gFontSize       = [13,10,10];
KJE.gHeight               = 250;
KJE.gHeightReport         = 350;
KJE.gColorBackground      ="#FFFFFF";
KJE.gColorForeground      ="#000000";
KJE.gColorGrid            ="#BBBBBB";
KJE.gColorGridBackground1 ="#FFFFFF";
KJE.gColorGridBackground2 ="#FFFFFF";
KJE.gColorAxisLine        ="#666666";
KJE.gColorText            ="#000000";
KJE.gColorList            = ["#004D71","#F2FAFC","#BB2254","#FEF9FB","#E07C00","#79BC43","#007AA3","#009ABF","#F8FCF6","#FDF8F2","#f5dbbd","#b3e7ff","#1ab6ff","#00344d","#005780","#e46890","#6c1430","#410c1d","#fbe9ef","#ffff90","#a0c8ef"];
