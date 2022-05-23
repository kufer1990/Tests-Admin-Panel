import * as XLSX from "xlsx";

describe("api", () => {
  it("api test", () => {
    cy.request({
      method: "GET",
      url: 'https://api.dev.caterings.nidev.pl/reports/shopping?parameters[]={"_key":"94ea5458-1215-457c-8e9f-39e1c2bf9b99","brands":["*","/brands/1"],"subBrands":["*","/sub-brands/4","/sub-brands/5","/sub-brands/6","/sub-brands/7","/sub-brands/8","/sub-brands/9"],"zoneCategories":[],"dateFrom":"2022-05-23","dateTo":"2022-05-24","multiplier":1,"includeSubscriptions":false}',
      headers: {
        // "X-DEV-FRONTEND-ORIGIN": "https://admin.dev.caterings.nidev.pl",
        origin: "https://admin.dev.caterings.nidev.pl",
        "x-locale": "pl",
        "x-g-brand": "1",
        // "X-DEV-FRONTEND-KEY": "QwK`q6sDM/PxLsK",
        accept: "application/vnd.ms-excel",
        "Accept-Encoding": "gzip, deflate, br",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTMzMDk5MDMsImV4cCI6MTY1MzMxMzUwMywicm9sZXMiOltdLCJ1c2VybmFtZSI6Impha3ViLmZlcmRla0BjYXRlcmluZ3MucGwiLCJlbWFpbCI6Impha3ViLmZlcmRla0BjYXRlcmluZ3MucGwiLCJmaXJzdE5hbWUiOiJKYWt1YiIsImxhc3ROYW1lIjoiRmVyZGVrIiwiY29tcGFueSI6Ii9jb21wYW5pZXMvMSIsImJyYW5kIjpudWxsLCJpZCI6Ii9lbXBsb3llZXMvOTcyIiwiaHVtYW5SZWFkYWJsZUlkIjo5NzIsInBob25lQ291bnRyeUNvZGUiOiJQTCIsInBob25lIjoiKzQ4NzkwNzkwNzkwIiwiYnJhbmRzIjpbeyJAaWQiOiIvYnJhbmRzLzEiLCJpZCI6MSwibmFtZSI6IkhvdCBEb2cgREVWMSJ9LHsiQGlkIjoiL2JyYW5kcy82IiwiaWQiOjYsIm5hbWUiOiJQYW5lbCAzIn0seyJAaWQiOiIvYnJhbmRzLzUiLCJpZCI6NSwibmFtZSI6IlBhbmVsIDIifSx7IkBpZCI6Ii9icmFuZHMvMTciLCJpZCI6MTcsIm5hbWUiOiJUZXN0b3dhIE1pbG9zeiJ9LHsiQGlkIjoiL2JyYW5kcy8yMCIsImlkIjoyMCwibmFtZSI6Ik1hcnR5bmEgQmlzdHJvIDEifSx7IkBpZCI6Ii9icmFuZHMvMjEiLCJpZCI6MjEsIm5hbWUiOiJDYXRlcmlubyJ9LHsiQGlkIjoiL2JyYW5kcy8yMiIsImlkIjoyMiwibmFtZSI6Ikt1YmEgVGVzdCJ9XSwibGFzdE1vZGlmeWluZ0FjdGl2aXR5QXQiOjE2NTMzMDk4OTcsImltYWdlIjpudWxsLCJpbWFnZVVybCI6bnVsbCwibGFuZ3VhZ2UiOiJwbCJ9.4lIjb0QrRBX_mj-CHaFOmQwqs5L9VdacP-BAUM0YLBL-Ljy2QcDGBCX5AZhFouPtYZnl267QyvIsUoqmFMx5FKx0JTr99--jgNWbWMbo0IIep7ITXkP0x52xIUbfPq3Cj2YI4I6xDWctQmd6mnR1mJhiW7d9iMaPj3Vuw3r9IHHcgoLh3bScjZ67IjvSeidKCyfqqobAyJ4fu3Wykmnoq0hzZNZEZMVLX2DQBDt9gMupwovty0yXEQkxso9htFP0xybeEZ_Pakim6r-pg5AmTBpP1iQuO-F1-yWwyWljlFQajk7JQ1bttC3U5OhXFqLTeZVh-bh0Zhf_djLoOH9-ptQBSRzx5abqKteQS_ok0WAKrTYVDwYl-0xk_Fq6BoLmQf2haXm0Kw5AeWEkSKPhoVDQSRt_z2fYuYZaHftiP-Wf0DQNShZ35fUR8NME7QYwPLfoq4DyZA2aW1LG4GU5dRSdbvOFXt0mDfDHkXH1OODSqYZORNvKfiUBTgj9fpyk-Y8gWX8yDGb8D1tEgtUy4F7ZfVF6nu1xfWd-chD38TOlsMWymtPMQzyycIHXH0SYCItRRah9LTwM-jrAZbDwpzIGR7-EIz2ogMyBdn0oNFmU2Ha1SJzPCiHWSWvhAeaEBWCmcIvtXpp4__-7f48oRcBAgv-fAgGwUAn5JyOjgBY",
      },
    }).then(async (response) => {
      const dataArrayBuffer = await new Blob([
        response.body,
        { type: "application/vnd.ms-excel" },
      ]).arrayBuffer();
      cy.writeFile("report.xlsx", dataArrayBuffer);

      //   const dataArray = new ArrayBuffer(response.body);
      //   const data = new Uint8Array(dataArrayBuffer);
      //   const workbook = XLSX.read(dataArrayBuffer, {
      //     type: "array",
      //   });
      //   const first_sheet_name = workbook.SheetNames[0];
      //   const worksheet = workbook.Sheets[first_sheet_name];
      //   const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      //     raw: true,
      //   });
      //   //   expect(jsonData).to.be.not.empty;

      //   console.log(workbook);
    });
  });
});
