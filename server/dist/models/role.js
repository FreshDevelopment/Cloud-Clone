"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: [true, 'Role is required'],
    },
});
exports.default = mongoose_1.model('Role', RoleSchema);
//# sourceMappingURL=role.js.map