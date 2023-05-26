import { Transform, Type, plainToClass } from "class-transformer"
import { ArrayMinSize, ArrayNotEmpty, IsBoolean, IsISO8601, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateIf, ValidateNested } from "class-validator"

class Nearby {
  @IsString()
  @IsNotEmpty()
  stationBefore: string
  
  @IsString()
  @IsNotEmpty()
  stationAfter: string
}

class Coordinates {
  @IsLatitude()
  @IsNotEmpty()
  latitude: number

  @IsLongitude()
  @IsNotEmpty()
  longitude: number
}

class RailType {
  @IsString()
  @IsNotEmpty()
  type: string
  
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  weight: number
}

class Telegram {
  @IsString()
  @IsNotEmpty()
  telegramBefore: string
  
  @IsString()
  @IsNotEmpty()
  telegramAfter: string
}

class MaintenanceRecord {
  
  @IsBoolean()
  @IsNotEmpty()
  hasMaintenanceRecord: boolean

  @IsString()
  @ValidateIf(o => !!o.hasMaintenanceRecord)
  lastMaintenanceTimes: string

  @IsString()
  @ValidateIf(o => !!o.hasMaintenanceRecord)
  yearlyMaintenanceTimes: string
}

class GeneralSurvey {
  @IsISO8601()
  @IsNotEmpty()
  date: string

  // @IsString()
  // @IsNotEmpty()
  // area: string
  
  @IsString()
  @IsNotEmpty()
  zone: string
  
  // @IsString()
  // @IsNotEmpty()
  // station: string

  @ValidateNested()
  @Type(() => Coordinates)
  @IsNotEmpty()
  coordinates: Coordinates

  @Min(0)
  @IsInt()
  @IsOptional()
  kilometers: number
  
  @ValidateNested()
  @Type(() => Nearby)
  @IsNotEmpty()
  nearby: Nearby
  
  @ValidateNested()
  @Type(() => RailType)
  @IsNotEmpty()
  railType: RailType
  
  @ValidateNested()
  @Type(() => Telegram)
  @IsNotEmpty()
  telegram: Telegram
  
  // @ArrayMaxSize(6)
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsNotEmpty()
  areaCondition: string[]
}

class RailDamageSurvey {

  // @ValidateNested({ each: true })
  // @Transform(({value}) => plainToClass(UploadImages, JSON.parse(value)))
  // @Type(() => UploadImages)
  // @IsNotEmpty()
  // uploadImages: UploadImages[]
  @IsNotEmpty()
  uploadImages: string[]

  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsNotEmpty()
  situation: string[]

  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsNotEmpty()
  location: string[]

  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsNotEmpty()
  defectPattern: string[]
  
  // @IsArray()
  // @IsOptional()
  // surfaceDefectPattern: string[]
}

class TrackDamageSurvey {

  // @ValidateNested({ each: true })
  // @Type(() => UploadImages)
  // @IsNotEmpty()
  // uploadImages: UploadImages[]
  @IsNotEmpty()
  uploadImages: string[]

  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsNotEmpty()
  trackGeometryCondition: string[]

  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsNotEmpty()
  ballastCondition: string[]

  // @IsString()
  // @IsNotEmpty()
  // ballastCompaction: string

  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsNotEmpty()
  sleeperCondition: string[]

  // @IsString()
  // @IsNotEmpty()
  // sleeperType: string

  @IsString()
  @IsNotEmpty()
  trackFoundationCondition: string
}

class MaintenanceRate {

  @IsString()
  @IsNotEmpty()
  severity: string
  
  @IsBoolean()
  @IsNotEmpty()
  isAnalyzeDamage: boolean

  @ValidateNested()
  @Type(() => MaintenanceRecord)
  @IsNotEmpty()
  maintenanceRecord: MaintenanceRecord
  
  // @IsString()
  // @IsOptional()
  // comment: string

  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsNotEmpty()
  maintenanceMethod: string[]
}

class Form {
  @ValidateNested()
  @Type(() => GeneralSurvey)
  @IsNotEmpty()
  generalSurvey: GeneralSurvey

  @ValidateNested()
  @Type(() => RailDamageSurvey)
  @IsNotEmpty()
  railDamageSurvey: RailDamageSurvey
  
  @ValidateNested()
  @Type(() => TrackDamageSurvey)
  @IsNotEmpty()
  trackDamageSurvey: TrackDamageSurvey

  @ValidateNested()
  @Type(() => MaintenanceRate)
  @IsNotEmpty()
  maintenanceRate: MaintenanceRate

  @IsNotEmpty()
  signature: string
  
  // @IsISO8601()
  // @IsOptional()
  // createdAt: Date
  
  @IsString()
  @IsNotEmpty()
  createdBy: string

  @IsString()
  @IsNotEmpty()
  modifiedBy: string
}

export class CreateRailSurveyDto {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(Form, JSON.parse(value)))
  @Type(() => Form)
  @IsNotEmpty()
  form: Form
}
