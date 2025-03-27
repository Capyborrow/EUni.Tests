"""This module contains configuration settings."""
from os import getenv
from dotenv import load_dotenv

class Config: # pylint: disable=too-few-public-methods
    """Configuration class for application settings."""
    load_dotenv('../.env')

    BASE_URL = getenv('BASE_URL')
