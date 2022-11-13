import unittest
import stringFunctions as sF

class TestStringMethods(unittest.TestCase):

    def test_capital_indexes1(self):
        test1 = ["AbCDeFABcDEFghIJ",[0, 2, 3, 5, 6, 7, 9, 10, 11, 14, 15]]
        self.assertEqual(sF.capital_indexes(test1[0]), test1[1])

    def test_capital_indexes2(self):
        test2 = ["ABCDeFABcDEFghIJ",[0,1, 2, 3, 5, 6, 7, 9, 10, 11, 14, 15]]
        self.assertEqual(sF.capital_indexes(test2[0]), test2[1])

    def test_mid1(self):
        self.assertEqual(sF.mid('AbCDeFABcDEFghIJ'), 'c')

    def test_mid2(self):
        self.assertEqual(sF.mid('AbC De FDE $FghIJ'), 'D')

    def test_replace3rd1(self):
        self.assertEqual(sF.replace3rd('AbCDeFABcDEFghIJ', 'X', 3), 'AbXDeXABXDEXghXJ')

    def test_replace3rd2(self):
        self.assertEqual(sF.replace3rd('HelloWorldOfMiceAndMen', 'X', 3), 'HeXloXorXdOXMiXeAXdMXn')

if __name__ == '__main__':
    unittest.main()
