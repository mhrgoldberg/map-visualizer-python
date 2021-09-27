from enum import Enum, auto


class SportOptions(Enum):
    Cycle = auto()
    Run = auto()
    Hike = auto()
    MultiSport = auto()
    Other = auto()


class GenderOptions(Enum):
    Male = auto()
    Female = auto()
    Other = auto()
