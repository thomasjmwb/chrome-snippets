// Open devtools undocked, then inspect that devtools again
// Run in the secondary console
/*
 control + shift + i
 undock
 control + shift i
 run in 2nd console
*/

let exportSnippets;
InspectorFrontendHost.getPreferences(_ => { exportSnippets = JSON.parse(_.scriptSnippets); });

// then
copy(JSON.stringify(exportSnippets));
// now you can: copy(exportSnippets);

// import back in
let importSnippets = [ /* paste snippets */ ];
InspectorFrontendHost.setPreference("scriptSnippets", JSON.stringify(importSnippets));