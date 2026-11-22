import { BuildAnimation } from './BuildAnimation'
import { DeployAnimation } from './DeployAnimation'
import { DevelopAnimation } from './DevelopAnimation'
import { TestAnimation } from './TestAnimation'

/** Indexed like PHASES in ../timeline. */
export const PHASE_ILLUSTRATIONS = [DevelopAnimation, BuildAnimation, TestAnimation, DeployAnimation]
