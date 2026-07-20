"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidRoleAssignment = IsValidRoleAssignment;
var class_validator_1 = require("class-validator");
var user_entity_1 = require("../../users/entities/user.entity");
function IsValidRoleAssignment(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidRoleAssignment',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: function (value, args) {
                    // This validator can be extended to include business logic
                    // For now, it just checks if the role is a valid enum value
                    // Business rules like preventing admin assignment would be in service layer
                    if (value === undefined || value === null)
                        return true;
                    return Object.values(user_entity_1.UserRole).includes(value);
                },
                defaultMessage: function (args) {
                    return "".concat(args.property, " must be a valid user role");
                },
            },
        });
    };
}
