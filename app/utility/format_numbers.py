def get_miles(i: float) -> str:
    """
    Convert meters to miles and format to 2 decimal places with commas between thousands
    """
    return format(i * 0.000621371192, ",.2f")


def get_feet(i: float) -> str:
    """
    Convert meters to feet and format to 2 decimal places with commas between thousands
    """
    return format(i * 3.28084, ",.1f")


def format_decimals(i: float) -> str:
    """
    Format to 2 decimal places with commas between thousands
    """
    return format(i, ",.2f")
