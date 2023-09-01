import * as XLSX from "xlsx";
import { createBaseFile, handleApi, processZip, readFileAsBuffer, readFileWithXLSX } from "../../utils/utils";
export const handleLoad = async () => {
   const types: any[] = [];
   const member: any = {};
   member.name = "Settings";
   member.members = [];
   member.members.push("Address");
   types.push(member);
   let response = await handleApi("metadataRetrieve", { types: types });
   const files = await processZip(response.zipFile);
   let { countries } = files["settings/Address.settings"].AddressSettings.countriesAndStates;
   return countries.sort((a: any, b: any) => {
      return a.label > b.label ? 1 : -1;
   });
};
export const download = async (countries: any[]) => {
   const countriesWb = XLSX.utils.book_new();
   const countryListws = XLSX.utils.json_to_sheet(JSON.parse(JSON.stringify(countries)));
   XLSX.utils.book_append_sheet(countriesWb, countryListws, "Countries");
   for (let i = 0; i < countries.length; i++) {
      if (countries[i] && countries[i].states) {
         if (countries[i].states[0]) {
            const statesws = XLSX.utils.json_to_sheet(JSON.parse(JSON.stringify(countries[i].states)));
            XLSX.utils.book_append_sheet(countriesWb, statesws, countries[i].isoCode);
         } else {
            const stateList = [];
            stateList.push(countries[i].states);
            const statesws = XLSX.utils.json_to_sheet(JSON.parse(JSON.stringify(stateList)));
            XLSX.utils.book_append_sheet(countriesWb, statesws, countries[i].isoCode);
         }
      }
   }
   XLSX.writeFile(countriesWb, `Address.xlsx`);
};
export const upload = async (fileData: any) => {
   const resultFile = await readFileAsBuffer(fileData);
   const workbook = await readFileWithXLSX(resultFile);
   const countries = XLSX.utils.sheet_to_json(workbook.Sheets.Countries, {
      defval: "",
   });
   for (let i = 0; i < countries.length; i++) {
      const country: any = countries[i];
      if (workbook.Sheets[country.isoCode]) {
         country.states = XLSX.utils.sheet_to_json(workbook.Sheets[country.isoCode], {
            defval: "",
         });
      } else {
         country.states = [];
      }
   }
   return countries;
};

export const deployCountries = async (countries: any[]) => {
   let packageXML = {
      "?xml": {
         "@_version": "1.0",
         "@_encoding": "UTF-8",
      },
      Package: {
         types: {
            members: "Address",
            name: "Settings",
         },
         version: 58,
         "@_xmlns": "http://soap.sforce.com/2006/04/metadata",
      },
   };
   let files: any = {};
   files["package.xml"] = packageXML;
   files["settings/Address.settings"] = {};
   files["settings/Address.settings"]["?xml"] = {};
   files["settings/Address.settings"]["?xml"] = {
      "@_version": "1.0",
      "@_encoding": "UTF-8",
   };
   files["settings/Address.settings"].AddressSettings = {};
   files["settings/Address.settings"].AddressSettings["@_xmlns"] = "http://soap.sforce.com/2006/04/metadata";
   files["settings/Address.settings"].AddressSettings.countriesAndStates = {};
   files["settings/Address.settings"].AddressSettings.countriesAndStates.countries = JSON.parse(JSON.stringify(countries));
   const zipFile = await createBaseFile(files);
   let response = await handleApi("metadataDeploy", { zipFile: zipFile });
   return response;
};
