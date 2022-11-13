import unittest
import s3file as s3

class TestStringMethods(unittest.TestCase):

    def test1(self):
      replacement = 'X'
      spacing = 3
      self.assertEqual(s3.s3fun(replacement, spacing), "noXhiXg Xo XeeXheXexXfiXmcX")

if __name__ == '__main__':
    unittest.main()
