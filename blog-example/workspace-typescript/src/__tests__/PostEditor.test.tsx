import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostEditor from "../PostEditor";

// TODO: Write tests for the PostEditor component

// test("Test PostEditor", () => { /* your test code here */ })

// Ideas what you could test:
//  - does the initial PostEditor renders correctly?
//  - Does the enablement of the buttons work correctly?
//     - Save button should only be enabled if both text fields are filled
//     - Clear button should only be enabled if at least one text field is filled
//  - Are the error/success messages correct?
//     - If a field is empty, an error message should appear otherwise a success info message
//  - Does the clear button work?
//     - It should clear both input fields
//  - Does the save button work?
//     - It should invoke your onSavePost-callback function with an object
//       that contains the values from the input field ({title: "...", body: "..."})
