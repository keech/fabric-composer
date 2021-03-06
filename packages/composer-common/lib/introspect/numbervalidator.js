/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Validator = require('./validator');

/**
 * A Validator to enforce that non null numeric values are between two values.
 * @private
 * @class
 * @memberof module:composer-common
 */
class NumberValidator extends Validator{

    /**
     * Create a NumberValidator.
     * @param {Field} field - the field this validator is attached to
     * @param {Object} ast - The ast for the range defined as [lower,upper] (inclusive).
     *
     * @throws {InvalidModelException}
     */
    constructor(field, ast) {
        super(field,ast);

        this.lowerBound = ast.lower;
        this.upperBound = ast.upper;

        if(this.lowerBound > this.upperBound) {
            this.reportError(null, 'Lower bound must be less than or equal to upper bound.');
        }
    }

    /**
     * Validate the property
     * @param {string} identifier the identifier of the instance being validated
     * @param {Object} value the value to validate
     * @throws {InvalidModelException}
     * @private
     */
    validate(identifier, value) {
        if(value !== null) {
            if(this.lowerBound && value < this.lowerBound) {
                this.reportError(identifier, 'Value is outside lower bound ' + value);
            }

            if(this.upperBound && value > this.upperBound) {
                this.reportError(identifier, 'Value is outside upper bound ' + value);
            }
        }
    }
}

module.exports = NumberValidator;
