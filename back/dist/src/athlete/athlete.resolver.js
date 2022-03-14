"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const athlete_service_1 = require("./athlete.service");
const athlete_model_1 = require("./models/athlete.model");
let AthleteResolver = class AthleteResolver {
    constructor(athleteService) {
        this.athleteService = athleteService;
    }
    async getAthlete(athleteId) {
        return this.athleteService.getById(athleteId);
    }
};
__decorate([
    (0, graphql_1.Query)(() => athlete_model_1.Athlete),
    __param(0, (0, graphql_1.Args)({ name: 'athleteId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AthleteResolver.prototype, "getAthlete", null);
AthleteResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [athlete_service_1.AthleteService])
], AthleteResolver);
exports.AthleteResolver = AthleteResolver;
//# sourceMappingURL=athlete.resolver.js.map